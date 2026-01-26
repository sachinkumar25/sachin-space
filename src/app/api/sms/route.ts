import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { verifyOrigin } from '@/lib/auth';

// Zod Schema
const smsSchema = z.object({
    message: z.string().min(1, "Message cannot be empty").max(2000, "Message too long"),
    sender: z.string().max(100, "Sender name too long").optional(),
});

// Environment variables for Gmail/SMTP
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const myPhoneNumber = process.env.MY_PHONE_NUMBER;

export async function POST(request: NextRequest) {
    // 1. Internal API Protection
    if (!verifyOrigin(request)) {
        return NextResponse.json({ error: 'Unauthorized Origin' }, { status: 403 });
    }

    console.log('--- SMS (via T-Mobile Email) Attempt ---');

    if (!emailUser || !emailPass || !myPhoneNumber) {
        console.error('Missing Email/Phone configuration');
        return NextResponse.json(
            { error: 'Server misconfigured. Check EMAIL_USER, EMAIL_PASS, and MY_PHONE_NUMBER.' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();

        const parseResult = smsSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: 'Invalid input', details: parseResult.error }, { status: 400 });
        }

        const { message, sender } = parseResult.data;

        // Target: Send to your own email
        const targetEmail = emailUser;
        console.log(`Targeting Email: ${targetEmail}`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // Send Email Notification
        const info = await transporter.sendMail({
            from: `"Portfolio Bot" <${emailUser}>`,
            to: targetEmail,
            subject: `New Portfolio Message from ${sender || 'Visitor'}`,
            text: `You received a new message on your portfolio:\n\n"${message}"\n\n---\n\nNOTE: This message was sent anonymously from your website.\nIf the user provided contact info in the message above, reply to THEM directly.\nDO NOT reply to this email (it will just go to yourself).`,
        });

        console.log('Notification Email sent:', info.messageId);
        return NextResponse.json({ success: true, sid: info.messageId });

    } catch (error: unknown) {
        console.error('Email Notification Failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to send email notification', details: errorMessage },
            { status: 500 }
        );
    }
}
