// app/api/auth/facebook/callback/route.ts
// Facebook OAuth callback — details details/details

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const APP_URL = process.env.APP_URL!;

  if (!code) {
    return NextResponse.redirect(`${APP_URL}?error=facebook_cancelled`);
  }

  try {
    const redirectUri = `${APP_URL}/api/auth/facebook/callback`;

    // 1. code → access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `client_id=${process.env.FACEBOOK_CLIENT_ID}` +
      `&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error('FB token error:', tokenData);
      return NextResponse.redirect(`${APP_URL}?error=facebook_token`);
    }

    // 2. access token → user info
    const profileRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${tokenData.access_token}`
    );
    const profile = await profileRes.json();

    if (!profile.id) {
      return NextResponse.redirect(`${APP_URL}?error=facebook_profile`);
    }

    await connectDB();

    // 3. details details details details
    let user = await User.findOne({
      $or: [
        { email: profile.email },
        { facebookId: profile.id },
      ]
    });

    if (!user) {
      // details details
      user = await User.create({
        name: profile.name,
        // email details details details — fallback-details
email: profile.email || `fb_${profile.id}@gamitsvale.ge`,
        facebookId: profile.id,
        avatar: profile.picture?.data?.url || '',
        isVerified: true, // Facebook-details details verified-details
        balance: 0,
        password: '',
      });
    } else if (!user.facebookId) {
      // details user-details facebookId details
      user.facebookId = profile.id;
      if (!user.avatar && profile.picture?.data?.url) {
        user.avatar = profile.picture.data.url;
      }
      await user.save();
    }

    // 4. JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    // 5. Cookie + redirect
    const res = NextResponse.redirect(APP_URL);
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.redirect(`${APP_URL}?error=facebook_error`);
  }
}