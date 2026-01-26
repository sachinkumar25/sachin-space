import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Environment variables for Gmail/SMTP
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const myPhoneNumber = process.env.MY_PHONE_NUMBER;

export async function POST(request: Request) {
    console.log('--- SMS (via T-Mobile Email) Attempt ---');

    if (!emailUser || !emailPass || !myPhoneNumber) {
        console.error('Missing Email/Phone configuration');
        return NextResponse.json(
            { error: 'Server misconfigured. Check EMAIL_USER, EMAIL_PASS, and MY_PHONE_NUMBER.' },
            { status: 500 }
        );
    }

    try {
        const { message, sender } = await request.json();

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
