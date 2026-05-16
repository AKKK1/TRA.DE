// app/api/listings/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Listing, User } from '@/lib/models';
import { getUserFromRequest } from '@/lib/auth';
import { CONFIG } from '@/lib/config';

const WANTED_ITEM_MAX_LENGTH = 18;
const SERVICE_WANTED_MAX_LENGTH = 48;

function normalizeWantedItems(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 3)
    .map((item) =>
      String(item || '')
        .trim()
        .replace(/\s+/g, ' ')
        .toUpperCase()
        .slice(0, WANTED_ITEM_MAX_LENGTH)
    )
    .filter(Boolean);
}

function normalizeServiceWanted(value: unknown) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, SERVICE_WANTED_MAX_LENGTH);
}

// ─────────────────────────────────────────────────────────────────────────────
// ✏️ PATCH: details details
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ◄── Next.js 15: params details Promise!
) {
  await connectDB();
  const decoded = getUserFromRequest(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user =
    (await User.findById(decoded.id)) ||
    (decoded.role === 'ADMIN' ? await User.findOne({ role: 'ADMIN' }) : null);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const body = await request.json();
  
  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  // 🔑 Next.js 15 FIX: params details details awaited!
  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  const { id } = await params; // ◄── details await!
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  console.log("📦 PATCH received for id:", id, "body:", {
    tradePeriod: body.tradePeriod,
    tradeDuration: body.tradeDuration,
    tradeUnit: body.tradeUnit,
  });

  // ▼▼▼ details: listing details? ▼▼▼
  const existingListing = await Listing.findById(id);
  if (!existingListing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  
  // ▼▼▼ details: details ▼▼▼
  if (existingListing.owner.toString() !== user._id.toString() && user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  if (
    body.listingType === 'EXCLUSIVE' &&
    user.role !== 'ADMIN' &&
    !user.canPostExclusive
  ) {
    return NextResponse.json(
      { error: 'Exclusive posting is not enabled for this account' },
      { status: 403 }
    );
  }

  // ▼▼▼ details details details ▼▼▼
  const { title, category, city, description } = body;
  if (title !== undefined && !title?.trim()) 
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (category !== undefined && !category?.trim()) 
    return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  if (city !== undefined && !city?.trim()) 
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  if (description !== undefined && !description?.trim()) 
    return NextResponse.json({ error: 'Description is required' }, { status: 400 });

  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  // 🔁 details details details details
  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  
  // 1. details "Listing details" details details details details (details ...body details details)
  const { tradePeriod: _, tradeDuration: __, tradeUnit: ___, ...cleanBody } = body;
  
  const updateData: any = { ...cleanBody };

  if (body.wantedType !== undefined || body.wantedItems !== undefined) {
    updateData.wantedItems =
      body.wantedType === 'items' ? normalizeWantedItems(body.wantedItems) : [];
  }

  if (body.wantedType !== undefined || body.serviceWanted !== undefined) {
    updateData.serviceWanted =
      body.wantedType === 'service' ? normalizeServiceWanted(body.serviceWanted) : '';
  }
  
  // 2. details tradePeriod details details, details
  if (body.tradePeriod !== undefined) {
    const tradePeriod = body.tradePeriod === 'temporary' ? 'temporary' : 'permanent';
    updateData.tradePeriod = tradePeriod;
    
    if (tradePeriod === 'temporary') {
      // details: details details details
      updateData.tradeDuration = Math.max(1, Math.min(999, parseInt(body.tradeDuration) || 1));
      updateData.tradeUnit = ['day', 'week', 'month', 'year'].includes(body.tradeUnit) 
        ? body.tradeUnit 
        : 'month';
    } else {
      // Permanent: details
      updateData.tradeDuration = null;
      updateData.tradeUnit = null;
    }
  }
  
  console.log("💾 PATCH will update:", { 
    tradePeriod: updateData.tradePeriod,
    tradeDuration: updateData.tradeDuration,
    tradeUnit: updateData.tradeUnit 
  });
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  // ▼▼▼ details ▼▼▼
  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  console.log("✅ PATCH updated listing._id:", updatedListing?._id);

  return NextResponse.json(updatedListing);
}

// ─────────────────────────────────────────────────────────────────────────────
// 🗑️ DELETE: details details
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ◄── Next.js 15: params details Promise!
) {
  await connectDB();
  const decoded = getUserFromRequest(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await User.findById(decoded.id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // ▼▼▼ Next.js 15 FIX ▼▼▼
  const { id } = await params; // ◄── details await!
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  
  const listing = await Listing.findById(id);
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  
  if (listing.owner.toString() !== decoded.id && user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  await Listing.findByIdAndDelete(id);
  
  return NextResponse.json({ message: 'Listing deleted' });
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔍 GET: details details details (details, details details)
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  
  const { id } = await params; // ◄── Next.js 15 FIX
  
  const listing = await Listing.findById(id)
    .populate('owner', 'name avatar username');
    
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  
  return NextResponse.json(listing);
}
