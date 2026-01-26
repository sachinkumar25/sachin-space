import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { ChatCompletionTool } from 'openai/resources/chat/completions';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { z } from 'zod';
import { verifyOrigin } from '@/lib/auth';

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Zod Schema for Input Validation
const chatSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['user', 'assistant', 'system']),
            content: z.string().max(1000, "Message too long").refine(s => s.trim().length > 0, "Empty message"),
        })
    ).max(10, "Too many messages in history"),
});

// Rate Limiter (5 requests per 60 seconds)
const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
});

// Define Tools Schema
const tools: ChatCompletionTool[] = [
    {
        type: 'function',
        function: {
            name: 'open_window',
            description: "Opens a specific application window on the user's desktop.",
            parameters: {
                type: 'object',
                properties: {
                    appId: {
                        type: 'string',
                        enum: ['terminal', 'finder', 'projects', 'resume', 'vscode', 'mail', 'about'],
                        description: 'The ID of the application to open.',
                    },
                },
                required: ['appId'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'list_projects',
            description: "Lists the user's projects.",
            parameters: {
                type: 'object',
                properties: {
                    tech: {
                        type: 'string',
                        description: 'Optional technology filter (e.g. python).',
                    },
                },
            },
        },
    },
];

export async function POST(req: NextRequest) {
    // 1. Internal API Protection (Origin Check)
    if (!verifyOrigin(req)) {
        return NextResponse.json({ error: 'Unauthorized Origin' }, { status: 403 });
    }

    // 2. Rate Limiting
    // Identify by IP
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ip = (req as any).ip ?? req.headers.get('x-forwarded-for') ?? '127.0.0.1';

    // Only run rate limiting if KV is configured (to avoid crashing in dev if variables missing)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
        }
    } else {
        console.warn('Rate Limiting disabled: KV_REST_API_URL or KV_REST_API_TOKEN missing.');
    }

    try {
        const body = await req.json();

        // 3. Input Validation
        const parseResult = chatSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: 'Invalid input', details: parseResult.error }, { status: 400 });
        }

        const { messages } = parseResult.data;

        // System Prompt
        const systemMessage = {
            role: 'system' as const,
            content: `You are a helpful portfolio assistant for Sachin. You can control the UI using tools. Be concise.

            Context: I am Sachin, a CS undergrad interested in ML and Trading.
            - Skills: Python, Next.js, TensorFlow.
            - Experience: Upcoming intern at [Company].
            - Tone: Professional but enthusiastic.

            Instructions:
            - If the user asks to see projects, use list_projects or open_window('projects').
            - If the user asks about my resume, use the open_window('resume') tool immediately.
            `
        };

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [systemMessage, ...messages],
            tools: tools,
            tool_choice: 'auto',
        });

        const choice = response.choices[0];
        const message = choice.message;

        // If the model wants to call a tool, return specific JSON
        if (message.tool_calls && message.tool_calls.length > 0) {
            const toolCall = message.tool_calls[0];

            if (toolCall.type === 'function') {
                const args = JSON.parse(toolCall.function.arguments);

                return NextResponse.json({
                    type: 'action',
                    tool: toolCall.function.name,
                    params: args,
                    response: `Executing ${toolCall.function.name}...`
                });
            }
        }

        // Otherwise return normal text
        return NextResponse.json({
            type: 'message',
            content: message.content,
        });

    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
