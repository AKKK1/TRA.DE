import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await connectDB();
  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  if (!user.isVerified) return NextResponse.json({ error: 'Please verify your email' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );

  const res = NextResponse.json({ user });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  return res;
}