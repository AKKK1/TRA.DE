import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

function verificationEmailHtml(code: string, name: string, email: string) {
  const appUrl = process.env.APP_URL || 'https://gamitsvale.ge';
  const activationLink = `${appUrl}/verify?email=${encodeURIComponent(email)}&code=${code}`;

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f8faf8;font-family:Arial,sans-serif">
      <div style="max-width:480px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8ebe8">
        <div style="background:#1a8a4a;padding:24px;text-align:center">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:2px">GAMITSVALE.GE</h1>
        </div>
        <div style="padding:32px;text-align:center">
          <p style="color:#555;font-size:15px;margin-bottom:8px">Hello, <strong style="color:#111">${name}</strong>!</p>
          <p style="color:#555;font-size:14px;margin-bottom:28px">Click the button to activate your account:</p>

          <a href="${activationLink}"
             style="display:inline-block;background:#1a8a4a;color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:12px;font-size:16px;font-weight:900;letter-spacing:1px;margin-bottom:28px">
            Activate account
          </a>

          <p style="color:#999;font-size:12px;margin-bottom:8px">Button not working? Copy this link:</p>
          <p style="color:#1a8a4a;font-size:11px;word-break:break-all;background:#e6f5ec;padding:10px;border-radius:8px">
            ${activationLink}
          </p>
 <p style="color:#999;font-size:12px;margin-bottom:8px>Or enter the code manually </p>
<p style="color:#555;font-size:15px;margin-bottom:8px"> <strong style="color:#111">${code}</strong>!</p>
          <p style="color:#bbb;font-size:11px;margin-top:20px">The link is valid for 30 minutes</p>
        </div>
        <div style="padding:16px;border-top:1px solid #e8ebe8;text-align:center">
          <p style="color:#bbb;font-size:11px;margin:0">© 2025 GAMITSVALE.GE</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: Request) {
  await connectDB();

  const { email, name, lastName, password, phone, whatsapp, telegram } = await request.json();

  if (!email || !name || !password) {
    return NextResponse.json(
      { error: 'Name, email, and password are required' },
      { status: 400 }
    );
  }

  const cleanPhone = String(phone || '').replace(/\s/g, '');
  const cleanWhatsapp = String(whatsapp || '').trim();
  const cleanTelegram = String(telegram || '').trim();

  if (!cleanPhone && !cleanWhatsapp && !cleanTelegram) {
    return NextResponse.json(
      { error: 'Add at least one contact method: phone, WhatsApp, or Telegram' },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: 'Password must be at least 6 characters' },
      { status: 400 }
    );
  }

  if (cleanPhone && !/^[\+]?[0-9]{9,15}$/.test(cleanPhone)) {
    return NextResponse.json(
      { error: 'Phone number is invalid' },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json(
      { error: 'This email is already in use' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const fullName = lastName ? `${name} ${lastName}`.trim() : name.trim();

  await User.create({
    email: email.toLowerCase(),
    name: fullName,
    password: hashedPassword,
    verificationCode,
    isVerified: false,
    balance: 0,
    phone: cleanPhone,
    whatsapp: cleanWhatsapp,
    telegram: cleanTelegram,
  });

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"GAMITSVALE.GE" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'TRA.DE — Activate your account',
      html: verificationEmailHtml(verificationCode, name, email),
    });
  } catch (emailError) {
    console.error('Email send error:', emailError);
    return NextResponse.json(
      { error: 'User was created, but the email could not be sent.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
