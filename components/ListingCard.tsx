// components/ListingCard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
  Package,
  Wrench,
  Sparkles,
} from "lucide-react";
import { cn } from "./AuthProvider";
import Toast from "./Toast";

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 details: details
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  green: "#1a8a4a",
  greenDark: "#125e33",
  greenLight: "#e6f5ec",
  bg: "#ffffff",
  bgCard: "#f8faf8",
  border: "#e8ebe8",
  text: "#111111",
  text2: "#555555",
  text3: "#999999",
  gold: "#c8820a",
  goldLight: "#fff8e6",
  white: "#ffffff",
  blue: "#1e088a ",
  offerMe: "#092686c5",
  orange: "#9c6126",
  orangeLight: "#ecd0b4",
};

const D = {
  green: "#1a8a4a",
  greenDark: "#125e33",
  greenLight: "#e6f5ec",
  border: "#e8ebe8",
  text: "#111111",
  text2: "#555555",
  text3: "#777777",
  surface: "#f8faf8",
};
// ─────────────────────────────────────────────────────────────────────────────
// ⏰ details details: "Details", "Details"
// ─────────────────────────────────────────────────────────────────────────────
function timeAgo(date: string) {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} days ago`;
  return new Date(date).toLocaleDateString("en-DE", {
    day: "numeric",
    month: "short",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 💀 Skeleton: details details
// ─────────────────────────────────────────────────────────────────────────────
export function ListingCardSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden animate-pulse"
      style={{ border: `1px solid ${C.border}`, background: C.bgCard }}
    >
      <div className="aspect-[4/3] w-full bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-gray-200 rounded-lg flex-1" />
          <div className="h-8 w-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔁 TradePeriodBadge: details details details details
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// ─────────────────────────────────────────────────────────────────────────────
function TradePeriodBadge({ listing }: { listing: any }) {
  // ▼▼▼ details details listing details (MongoDB-details details) ▼▼▼
  // details tradePeriod details details details details "permanent" → Permanent Trade
  const isPermanent =
    !listing.tradePeriod || listing.tradePeriod === "permanent";

  if (isPermanent) {
    // Permanent Trade: details details "♾ Permanent"
    return (
      <span
        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md"
        style={{ background: "#e6f5ec", color: C.green }}
      >
        ♾ Permanent
      </span>
    );
  }

  // details Trade: details details details
  const unitMap: Record<string, string> = {
    day: "day",
    week: "week",
    month: "month",
    year: "year",
  };
  const unit = unitMap[listing.tradeUnit] || listing.tradeUnit || "";

  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md"
      style={{
        background:
          "linear-gradient(135deg, #1e40af 0%, #4f46e5 56%, #7c3aed 100%)",
        color: "#ffffff",
        boxShadow: "0 6px 16px rgba(79,70,229,0.18)",
      }}
    >
      ⏳ {listing.tradeDuration} {unit}
      {/* details: ⏳ 2 details, ⏳ 1 details., ⏳ 6 details */}
    </span>
  );
}
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
// 🔁 TradePeriodBadge - details
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

// ─────────────────────────────────────────────────────────────────────────────
// 🧩 Props details
// ─────────────────────────────────────────────────────────────────────────────
interface ListingCardProps {
  listing: any;
  onOffer?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  user?: any;
  delay?: number;
  className?: string;
  index?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 🧩 details: ListingCard
// ─────────────────────────────────────────────────────────────────────────────
function getWantedChips(listing: any) {
  if (listing.wantedType === "service" && listing.serviceWanted) {
    return [String(listing.serviceWanted).trim()].filter(Boolean);
  }

  if (Array.isArray(listing.wantedItems)) {
    return listing.wantedItems
      .map((item: unknown) => String(item || "").trim())
      .filter(Boolean);
  }

  return [];
}

export default function ListingCard({
  listing,
  onOffer,
  onEdit,
  onDelete,
  user,
  delay = 0,
  className,
  index = 99,
}: ListingCardProps) {
  const isAboveFold = index < 4;
  const isLCP = index === 0;
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(
    user?.savedListings?.includes(listing._id),
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setIsSaved(user?.savedListings?.includes(listing._id));
  }, [user, listing._id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setToast("Please log in to save listings.");
      return;
    }
    try {
      const res = await fetch(`/api/listings/save/${listing._id}`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
        setToast(data.saved ? "Listing saved" : "Listing removed");
      }
    } catch {}
  };

  const hasMultipleImages = listing.images && listing.images.length > 1;
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((p) => (p + 1) % listing.images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (p) => (p - 1 + listing.images.length) % listing.images.length,
    );
  };

  const type = listing.listingType || (listing.isVIP ? "VIP" : "NORMAL");
  const isSilver = type === "SILVER";
  const isExclusive = type === "EXCLUSIVE";
  const isExchanged = listing.isTraded || listing.status === "EXCHANGED";
  const isOwner =
    user && (user._id === listing.owner?._id || user.role === "ADMIN");

  const cardBorder = isExclusive
    ? "2px solid #111111"
    : type === "VIP"
      ? "2px solid rgba(26,138,74,0.55)"
      : isSilver
        ? "2px solid rgba(100,116,139,0.34)"
        : "1.5px solid rgba(15,23,42,0.14)";
  const cardHoverShadow = isExclusive
    ? "0 16px 34px rgba(17,17,17,0.16)"
    : type === "VIP"
      ? "0 16px 34px rgba(26,138,74,0.16)"
      : isSilver
        ? "0 16px 34px rgba(15,23,42,0.12)"
        : "0 12px 28px rgba(15,23,42,0.1)";
  const wantedChips = getWantedChips(listing);
  const visibleWantedChips = wantedChips.slice(0, 2);
  const hiddenWantedCount = Math.max(
    0,
    wantedChips.length - visibleWantedChips.length,
  );
  const wantsService =
    listing.wantedType === "service" && Boolean(listing.serviceWanted);
  const isVip = type === "VIP";
  const wantsTheme = isExclusive
    ? {
        panel: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 52%, #06b6d4 100%)",
        border: "1px solid rgba(124,58,237,0.42)",
        label: "#ffffff",
        chipBg: "rgba(255,255,255,0.18)",
        chipBorder: "1px solid rgba(255,255,255,0.28)",
        chipText: "#ffffff",
        badge: "rgba(255,255,255,0.2)",
        badgeText: "#ffffff",
      }
    : isVip
      ? {
          panel: wantsService
            ? "linear-gradient(135deg, #7c4a03 0%, #c8820a 50%, #f3d37a 100%)"
            : "linear-gradient(135deg, #7c4a03 0%, #c8820a 50%, #f3d37a 100%)",
          border: "1px solid rgba(200,130,10,0.42)",
          label: "#fff7d6",
          chipBg: "rgba(255,255,255,0.2)",
          chipBorder: "1px solid rgba(255,255,255,0.3)",
          chipText: "#fffdf4",
          badge: "rgba(255,255,255,0.2)",
          badgeText: "#fffdf4",
        }
      : isSilver
        ? {
            panel:
              "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 52%, #f8fafc 100%)",
            border: "1px solid rgba(100,116,139,0.3)",
            label: wantsService ? "#0f766e" : "#334155",
            chipBg: "rgba(255,255,255,0.84)",
            chipBorder: wantsService
              ? "1px solid rgba(15,118,110,0.24)"
              : "1px solid rgba(100,116,139,0.28)",
            chipText: wantsService ? "#0f766e" : "#334155",
            badge: "rgba(255,255,255,0.84)",
            badgeText: wantsService ? "#0f766e" : "#334155",
          }
        : wantsService
          ? {
              panel: "#ffffff",
              border: "1px solid rgba(100,116,139,0.18)",
              label: "#0f766e",
              chipBg: "#ffffff",
              chipBorder: "1px solid rgba(15,118,110,0.2)",
              chipText: "#0f766e",
              badge: "rgba(15,118,110,0.1)",
              badgeText: "#0f766e",
            }
          : {
              panel: "#ffffff",
              border: "1px solid rgba(100,116,139,0.18)",
              label: "#475569",
              chipBg: C.white,
              chipBorder: "1px solid rgba(100,116,139,0.18)",
              chipText: "#334155",
              badge: "rgba(100,116,139,0.1)",
              badgeText: "#334155",
            };
  const openOfferTheme = {
    panel: "#ffffff",
    border: "1px solid rgba(100,116,139,0.18)",
    chipBg: "#ffffff",
    chipBorder: "1px solid rgba(99,102,241,0.34)",
    chipText: "#4f46e5",
  };
  const useTierTradePanel = wantedChips.length > 0 || isExclusive || isSilver;
  const tradePanelLabelColor =
    wantedChips.length > 0
      ? wantsTheme.label
      : isExclusive
        ? "#ffffff"
        : openOfferTheme.chipText;
  const tradePanelTextShadow =
    (wantedChips.length > 0 || isExclusive) && !isSilver
      ? "0 1px 8px rgba(15,23,42,0.28)"
      : "none";
  const openOfferChipStyle = {
    background: isExclusive ? "rgba(255,255,255,0.18)" : openOfferTheme.chipBg,
    border: isExclusive
      ? "1px solid rgba(255,255,255,0.28)"
      : openOfferTheme.chipBorder,
    color: isExclusive ? "#ffffff" : openOfferTheme.chipText,
  };
  const useReferenceTradeLayout = !isExclusive;
  const tradeIntentTheme = wantsService
    ? isVip
      ? {
          panel:
            "linear-gradient(135deg, rgba(255,253,244,0.96) 0%, rgba(255,247,214,0.9) 54%, rgba(255,255,255,0.92) 100%)",
          border: "1px solid rgba(200,130,10,0.32)",
          accent: "#8a5a08",
          chipBg: "rgba(255,255,255,0.72)",
          chipBorder: "1px solid rgba(200,130,10,0.18)",
          badgeBg: "rgba(200,130,10,0.1)",
          glow: "rgba(200,130,10,0.04)",
        }
      : isSilver
        ? {
            panel: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1.5px solid rgba(100,116,139,0.34)",
            accent: "#0f766e",
            chipBg: "#ffffff",
            chipBorder: "1px solid rgba(15,118,110,0.2)",
            badgeBg: "rgba(15,118,110,0.08)",
            glow: "rgba(100,116,139,0.08)",
          }
        : {
            panel: "#ffffff",
            border: "1.5px solid rgba(26,138,74,0.22)",
            accent: "#0f766e",
            chipBg: "#ffffff",
            chipBorder: "1px solid rgba(15,118,110,0.18)",
            badgeBg: "rgba(15,118,110,0.08)",
            glow: "rgba(26,138,74,0.05)",
          }
    : visibleWantedChips.length > 0
      ? isVip
        ? {
            panel:
              "linear-gradient(135deg, rgba(255,253,244,0.96) 0%, rgba(255,247,214,0.9) 54%, rgba(255,255,255,0.92) 100%)",
            border: "1px solid rgba(200,130,10,0.32)",
            accent: "#8a5a08",
            chipBg: "rgba(255,255,255,0.72)",
            chipBorder: "1px solid rgba(200,130,10,0.18)",
            badgeBg: "rgba(200,130,10,0.1)",
            glow: "rgba(200,130,10,0.04)",
          }
        : isSilver
          ? {
              panel:
                "linear-gradient(135deg, #ffffff 0%, #f8fafc 52%, #eef2f7 100%)",
              border: "1.5px solid rgba(100,116,139,0.32)",
              accent: "#334155",
              chipBg: "#ffffff",
              chipBorder: "1px solid rgba(100,116,139,0.2)",
              badgeBg: "rgba(100,116,139,0.08)",
              glow: "rgba(100,116,139,0.08)",
            }
          : {
              panel: "#ffffff",
              border: "1.5px solid rgba(26,138,74,0.22)",
              accent: C.green,
              chipBg: "#ffffff",
              chipBorder: "1px solid rgba(26,138,74,0.18)",
              badgeBg: "rgba(26,138,74,0.08)",
              glow: "rgba(26,138,74,0.05)",
            }
      : {
          panel: isVip
            ? "linear-gradient(135deg, rgba(255,253,244,0.96) 0%, rgba(255,247,214,0.9) 54%, rgba(255,255,255,0.92) 100%)"
            : isSilver
              ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 52%, #eef2f7 100%)"
              : "#ffffff",
          border: isVip
            ? "1px solid rgba(200,130,10,0.32)"
            : isSilver
              ? "1.5px solid rgba(100,116,139,0.3)"
              : "1.5px dashed rgba(100,116,139,0.28)",
          accent: isVip ? "#8a5a08" : isSilver ? "#334155" : "#475569",
          chipBg: isVip ? "rgba(255,255,255,0.72)" : "#ffffff",
          chipBorder: isVip
            ? "1px solid rgba(200,130,10,0.18)"
            : "1px solid rgba(100,116,139,0.2)",
          badgeBg: "rgba(100,116,139,0.08)",
          glow: isVip
            ? "rgba(200,130,10,0.04)"
            : isSilver
              ? "rgba(100,116,139,0.08)"
              : "rgba(15,23,42,0.04)",
        };
  const hasSpecificWant = wantsService || visibleWantedChips.length > 0;
  const priorityAccent = isVip
    ? "#c8820a"
    : isSilver
      ? "#94a3b8"
      : hasSpecificWant
        ? C.green
        : C.green;
  const IntentIcon = wantsService
    ? Wrench
    : visibleWantedChips.length > 0
      ? Package
      : Sparkles;
  const serviceBadgeTheme = {
    background: isExclusive
      ? "rgba(255,255,255,0.2)"
      : isVip || isSilver
        ? "rgba(255,255,255,0.78)"
        : "rgba(15,118,110,0.12)",
    color: isExclusive ? "#ffffff" : "#0f766e",
    border: isExclusive
      ? "1px solid rgba(255,255,255,0.28)"
      : isVip || isSilver
        ? "1px solid rgba(255,255,255,0.34)"
        : "1px solid rgba(15,118,110,0.22)",
  };
  const cardSurface = isSilver
    ? "#ffffff"
    : isExclusive
      ? "#ffffff"
      : isVip
        ? "#ffffff"
        : "#ffffff";
  const infoSurface = isSilver
    ? "rgb(255, 255, 255)"
    : isExclusive
      ? "rgb(255, 255, 255)"
      : isVip
        ? "rgb(255, 255, 255)"
        : "rgb(255, 255, 255)";

  return (
    <>
      <div
        className={cn("animate-fade-up h-full cursor-pointer", className)}
        style={{ animationDelay: `${delay}s` }}
        onClick={() => listing._id && router.push(`/listing/${listing._id}`)}
      >
        <div
          className={cn(
            "group relative w-full h-full flex flex-col overflow-hidden rounded-[14px] transition-all duration-200",
            isExclusive && !isExchanged && "exclusive-card-glow",
          )}
          style={{
            background: cardSurface,
            border: isExchanged ? "1px solid #fca5a5" : cardBorder,
            opacity: isExchanged ? 0.9 : 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow;
            if (!isExchanged)
              (e.currentTarget as HTMLElement).style.borderColor = isExclusive
                ? "#111111"
                : type === "VIP"
                  ? C.green
                  : isSilver
                    ? "#111111"
                    : C.green;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
            (e.currentTarget as HTMLElement).style.borderColor = isExclusive
              ? "#111111"
              : type === "VIP"
                ? C.green
                : isSilver
                  ? "#64748b"
                  : isExchanged
                    ? "#fca5a5"
                    : "rgba(15,23,42,0.14)";
          }}
        >
          {/* Exchanged overlay */}
          {isExchanged && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-[2px]"
              style={{ background: "rgba(255,255,255,0.6)" }}
            >
              <div
                className="transform -rotate-12 px-5 py-2 rounded-xl"
                style={{
                  border: "3px solid #ef4444",
                  background: "rgba(239,68,68,0.1)",
                }}
              >
                <span
                  className="text-xl font-bold uppercase tracking-[0.15em]"
                  style={{ color: "#ef4444" }}
                >
                  Exchanged
                </span>
              </div>
            </div>
          )}

          {/* details */}
          <div
            className="relative aspect-[4/3] w-full overflow-hidden shrink-0 group/carousel"
            style={{ background: "#f0f4f0" }}
          >
            <img
              src={
                listing.images?.[currentImageIndex] ||
                "https://picsum.photos/seed/item/400/400"
              }
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading={isAboveFold ? "eager" : "lazy"}
              fetchPriority={isLCP ? "high" : "auto"}
              alt={listing.title}
            />

            {listing.createdAt && (
              <span
                className="absolute top-2 right-2 z-20 flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  color: C.text3,
                  border: `1px solid ${C.border}`,
                }}
              >
                <Clock size={9} />
                {timeAgo(listing.createdAt)}
              </span>
            )}

            {/* carousel */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 shadow-sm"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 shadow-sm"
                >
                  <ChevronRight size={14} />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                  {listing.images.map((_: any, idx: number) => (
                    <div
                      key={idx}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: idx === currentImageIndex ? 12 : 6,
                        background:
                          idx === currentImageIndex
                            ? C.green
                            : "rgba(255,255,255,0.6)",
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* VIP / SILVER badge */}
            {isExclusive && (
              <span
                className="exclusive-badge-shimmer absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold z-20 shadow text-white"
                style={{
                  background: "linear-gradient(135deg, #6d28d9, #06b6d4)",
                }}
              >
                EXCLUSIVE
              </span>
            )}
            {type === "VIP" && (
              <span
                className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-black z-20 shadow flex items-center gap-1"
                style={{
                  background: "#111111",
                  color: "#ffffff",
                  border: "1px solid rgba(26,138,74,0.55)",
                  boxShadow: "0 6px 14px rgba(17,17,17,0.16)",
                }}
              >
                <Sparkles size={11} />
                VIP
              </span>
            )}
            {isSilver && (
              <span
                className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-black z-20 shadow flex items-center gap-1"
                style={{
                  background: "rgba(255,255,255,0.94)",
                  color: "#111111",
                  border: "1px solid rgba(17,17,17,0.24)",
                  boxShadow: "0 6px 14px rgba(17,17,17,0.1)",
                }}
              >
                <Sparkles size={11} />
                SILVER
              </span>
            )}

            {/* Save — details details-owner */}
            {!isOwner && (
              <button
                onClick={handleSave}
                className="absolute right-2 bottom-2 z-20 p-1.5 rounded-full shadow transition-all"
                style={{
                  background: isSaved ? "#ef4444" : "rgba(255,255,255,0.85)",
                  color: isSaved ? "#fff" : C.text3,
                }}
                onMouseEnter={(e) => {
                  if (!isSaved)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  if (!isSaved)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.85)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </button>
            )}
          </div>

          {/* details */}
          <div
            className="p-3 flex flex-col flex-1 gap-2"
            style={{ background: infoSurface }}
          >
            <h3
              className="font-bold text-[14px] leading-[1.18] line-clamp-2"
              style={{
                color: "#111111",
                fontFamily:
                  "'Segoe UI Variable Text', 'Segoe UI', Arial, sans-serif",
                letterSpacing: "0",
              }}
            >
              {listing.title}
            </h3>

            {/* Trade details */}
            {useReferenceTradeLayout ? (
              <div>
                <div
                  className="min-h-[72px] rounded-[10px] px-3 py-2.5"
                  style={{
                    background: tradeIntentTheme.panel,
                    border: tradeIntentTheme.border,
                    boxShadow: isVip
                      ? `inset 2px 0 0 ${priorityAccent}, inset 0 1px 0 rgba(255,255,255,0.72)`
                      : `inset 3px 0 0 ${priorityAccent}, inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 18px ${tradeIntentTheme.glow}`,
                  }}
                >
                  {hasSpecificWant && (
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p
                        className="flex items-center gap-1 text-[9px] font-bold uppercase"
                        style={{ color: tradeIntentTheme.accent }}
                      >
                        <IntentIcon size={9} />
                        WANTS
                      </p>
                      {wantsService && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                          style={{
                            background: tradeIntentTheme.badgeBg,
                            border: tradeIntentTheme.chipBorder,
                            color: tradeIntentTheme.accent,
                          }}
                        >
                          SERVICE SWAPS
                        </span>
                      )}
                    </div>
                  )}
                  {visibleWantedChips.length > 0 ? (
                    <div className="flex min-h-[28px] flex-wrap gap-1.5">
                      {visibleWantedChips.map(
                        (item: string, chipIndex: number) => (
                          <span
                            key={`${item}-${chipIndex}`}
                            className="max-w-full truncate rounded-full px-2.5 py-1 text-[11px] font-bold"
                            style={{
                              background: tradeIntentTheme.chipBg,
                              border: tradeIntentTheme.chipBorder,
                              color: tradeIntentTheme.accent,
                            }}
                            title={item}
                          >
                            {item}
                          </span>
                        ),
                      )}
                      {hiddenWantedCount > 0 && (
                        <span
                          className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                          style={{
                            background: tradeIntentTheme.chipBg,
                            border: tradeIntentTheme.chipBorder,
                            color: tradeIntentTheme.accent,
                          }}
                        >
                          +{hiddenWantedCount}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex min-h-[28px] items-center">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold"
                        style={{
                          background: tradeIntentTheme.chipBg,
                          border: tradeIntentTheme.chipBorder,
                          color: tradeIntentTheme.accent,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: tradeIntentTheme.accent }}
                        />
                        Open to offers
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="rounded-[12px] px-2.5 py-2.5"
                style={{
                  background: useTierTradePanel
                    ? wantsTheme.panel
                    : openOfferTheme.panel,
                  border: useTierTradePanel
                    ? wantsTheme.border
                    : openOfferTheme.border,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p
                    className="flex items-center gap-1 text-[9px] font-bold uppercase"
                    style={{
                      color: tradePanelLabelColor,
                      textShadow: tradePanelTextShadow,
                    }}
                  >
                    <RefreshCw size={8} />
                    WANTS
                  </p>
                  {wantsService && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                      style={{
                        background: serviceBadgeTheme.background,
                        color: serviceBadgeTheme.color,
                        border: serviceBadgeTheme.border,
                      }}
                    >
                      SERVICE SWAPS
                    </span>
                  )}
                </div>

                {visibleWantedChips.length > 0 ? (
                  <div className="flex min-h-[28px] flex-wrap gap-1.5">
                    {visibleWantedChips.map(
                      (item: string, chipIndex: number) => (
                        <span
                          key={`${item}-${chipIndex}`}
                          className="max-w-full truncate rounded-full px-2.5 py-1 text-[11px] font-bold"
                          style={{
                            background: wantsTheme.chipBg,
                            border: wantsTheme.chipBorder,
                            color: wantsTheme.chipText,
                          }}
                          title={item}
                        >
                          {item}
                        </span>
                      ),
                    )}
                    {hiddenWantedCount > 0 && (
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                        style={{
                          background: wantsTheme.chipBg,
                          border: wantsTheme.chipBorder,
                          color: wantsTheme.chipText,
                        }}
                      >
                        +{hiddenWantedCount}
                      </span>
                    )}
                  </div>
                ) : (
                  <span
                    className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style={openOfferChipStyle}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: isExclusive
                          ? "#ffffff"
                          : openOfferTheme.chipText,
                      }}
                    />
                    OPEN TO OFFER
                  </span>
                )}
              </div>
            )}

            {/* aqamde */}
            {/* footer */}
            <div
              className="flex items-center justify-between pt-1.5 mt-auto"
              style={{ borderTop: "1px solid rgba(100,116,139,0.22)" }}
            >
              {/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */}
              {/* 🔁 details details details: details details TradePeriodBadge */}
              {/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */}
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  color: C.text2,
                  border: "1px solid rgba(100,116,139,0.28)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.68)",
                }}
              >
                <MapPin size={11} color="#ef4444" />
                {listing.city}
              </span>
              {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
              {/* 🔁 details details details - details */}
              {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}

              {isOwner ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.();
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-all"
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      color: C.text2,
                    }}
                  >
                    <Edit3 size={10} /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                    className="p-1.5 rounded-lg transition-all text-red-400"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🧩 ListingsTabs: details details
// ─────────────────────────────────────────────────────────────────────────────
export type ListingTab = "exclusive" | "vip" | "new" | "nearby" | "popular";
interface ListingsTabsProps {
  activeTab: ListingTab;
  onChange: (tab: ListingTab) => void;
  hasExclusiveListings?: boolean;
}
const TABS: { id: ListingTab; label: string; accent: string; bg: string }[] = [
  {
    id: "exclusive",
    label: "Exclusive",
    accent: "#6d28d9",
    bg: "linear-gradient(135deg, rgba(109,40,217,0.12), rgba(6,182,212,0.12))",
  },
  { id: "vip", label: "VIP", accent: C.gold, bg: C.goldLight },
  { id: "new", label: "New", accent: C.green, bg: C.greenLight },
  { id: "nearby", label: "Nearby", accent: "#ef4444", bg: "#fff1f2" },
];
export function ListingsTabs({
  activeTab,
  onChange,
  hasExclusiveListings = false,
}: ListingsTabsProps) {
  return (
    <div
      className="mb-6 flex flex-wrap gap-2 rounded-2xl p-1.5"
      style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold transition-all whitespace-nowrap"
          style={{
            background: activeTab === tab.id ? tab.bg : "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            color: activeTab === tab.id ? tab.accent : C.text3,
            boxShadow:
              activeTab === tab.id ? "0 10px 24px rgba(17,24,39,0.06)" : "none",
          }}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              tab.id === "exclusive" &&
                hasExclusiveListings &&
                "exclusive-tab-dot",
            )}
            style={{ background: activeTab === tab.id ? tab.accent : C.border }}
          />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
