import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'prixairwebdev@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // update to a verified domain sender when ready

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, department, businessUnit, source } = body;

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
    }

    const senderName = name || 'Website Visitor';
    const emailSubject = subject || `New Contact Form Message${source ? ` — ${source}` : ''}`;
    const dept = department || businessUnit || 'General Inquiry';

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <div style="background: #f97316; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
          ${source ? `<p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">${source}</p>` : ''}
        </div>
        <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px; font-weight: 600;">Name</td>
              <td style="padding: 8px 0; color: #111;">${senderName}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Department</td>
              <td style="padding: 8px 0; color: #111;">${dept}</td>
            </tr>
          </table>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px;">
            <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; color: #111; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">Prixair Group · prixairgroup.com</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: `Prixair Contact Form <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: email,
      subject: emailSubject,
      html,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return NextResponse.json({ error: 'Failed to send email.', detail: error }, { status: 500 });
    }

    console.log('Email sent successfully, id:', data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
