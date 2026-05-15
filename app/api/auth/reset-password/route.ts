import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await connectDB();
  const { email, code, newPassword } = await request.json();

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (user.resetPasswordCode !== code) return NextResponse.json({ error: 'Invalid code' }, { status: 400 });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordCode = undefined;
  user.isVerified = true; // ← details details = details details
  await user.save();

  // details details details details details
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );

  const res = NextResponse.json({ success: true, user });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  return res;
}