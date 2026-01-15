import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { ChatCompletionTool } from 'openai/resources/chat/completions';

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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
    try {
        const { messages } = await req.json();

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
