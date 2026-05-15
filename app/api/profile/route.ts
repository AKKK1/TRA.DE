import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models';
import { getUserFromRequest } from '@/lib/auth';

export async function PATCH(request: Request) {
  await connectDB();
  const decoded = getUserFromRequest(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();

  const username = String(body.username || '').replace('@', '').trim().toLowerCase();
  const hasContact = Boolean(
    String(body.phone || '').trim() ||
    String(body.whatsapp || '').trim() ||
    String(body.telegram || '').trim()
  );

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  if (!hasContact) {
    return NextResponse.json(
      { error: 'Add at least one contact method: phone, WhatsApp, or Telegram' },
      { status: 400 }
    );
  }

  if (body.onboardingCompleted === true && body.termsAccepted !== true) {
    return NextResponse.json(
      { error: 'Please accept the rules before continuing' },
      { status: 400 }
    );
  }

  body.username = username;

  // username details details
  if (body.username) {
    const cleaned = body.username;
    body.username = cleaned;
    const existing = await User.findOne({ username: cleaned, _id: { $ne: decoded.id } });
    if (existing) {
      return NextResponse.json({ error: 'This username is already taken' }, { status: 400 });
    }
  }

  // details details (details details details details details)
  const allowed = ['phone','whatsapp', 'telegram', 'instagram', 'facebook', 'username'];
  const update: any = {};
  for (const key of allowed) {
    if (body[key] !== undefined) update[key] = body[key];
  }
  if (body.onboardingCompleted === true) {
    update.onboardingCompleted = true;
    update.termsAcceptedAt = new Date();
  }

  const user = await User.findByIdAndUpdate(decoded.id, update, { new: true });
  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  await connectDB();
  const decoded = getUserFromRequest(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await User.findByIdAndDelete(decoded.id);
  const res = NextResponse.json({ success: true });
  res.cookies.delete('token');
  return res;
}
