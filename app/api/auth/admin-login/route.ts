import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models';

export async function POST(request: Request) {
  const { id, pass } = await request.json();

  if (
    id === process.env.ADMIN_USERNAME &&
    pass === process.env.ADMIN_PASSWORD
  ) {
    await connectDB();

    let adminUser = await User.findOne({ role: 'ADMIN' });
    if (!adminUser) {
      adminUser = await User.findOneAndUpdate(
        { email: 'admin@gamitsvale.local' },
        {
          $setOnInsert: {
            name: 'Admin',
            email: 'admin@gamitsvale.local',
            role: 'ADMIN',
            isVerified: true,
            canPostExclusive: true,
            onboardingCompleted: true,
          },
        },
        { new: true, upsert: true }
      );
    } else if (!adminUser.canPostExclusive || !adminUser.onboardingCompleted) {
      adminUser.canPostExclusive = true;
      adminUser.onboardingCompleted = true;
      await adminUser.save();
    }

    const token = jwt.sign(
      { 
        id: adminUser._id.toString(),
        role: 'ADMIN' 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
