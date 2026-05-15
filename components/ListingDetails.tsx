"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Eye,
  Share2,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
} from "lucide-react";
import Toast from "./Toast";
import { cn, useAuth } from "./AuthProvider";
import Link from "next/link";
import OfferModal from "./OfferModal";

const C = {
  bg: "#ffffff",
  bg2: "#f8faf8",
  bg3: "#f0f4f0",
  green: "#1a8a4a",
  greenLight: "#e6f5ec",
  greenDark: "#125e33",
  text: "#111111",
  text2: "#555555",
  text3: "#999999",
  border: "#e8ebe8",
  gold: "#c8820a",
  goldLight: "#fff8e6",
};

// ── details details ──────────────────────────────────────────────────────────
function TradePeriodInfo({ listing }: { listing: any }) {
  const isPermanent =
    !listing.tradePeriod || listing.tradePeriod === "permanent";
  const unitMap: Record<string, string> = {
    day: "day",
    week: "week",
    month: "month",
    year: "year",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[11px] font-bold uppercase tracking-widest"
        style={{ color: C.text3 }}
      >
        Trade period:
      </span>
      {isPermanent ? (
        <span
          className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-lg"
          style={{ background: C.greenLight, color: C.green }}
        >
          ♾ Permanent
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #4f46e5 56%, #7c3aed 100%)",
            color: "#ffffff",
            boxShadow: "0 6px 16px rgba(79,70,229,0.18)",
          }}
        >
          <Clock size={12} />
          {listing.tradeDuration}{" "}
          {unitMap[listing.tradeUnit] || listing.tradeUnit}
        </span>
      )}
    </div>
  );
}

interface ListingDetailsProps {
  listing: any;
  user?: any;
  onOffer?: () => void;
}

export default function ListingDetails({
  listing,
  user,
  onOffer,
}: ListingDetailsProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isSaved, setIsSaved] = useState(
    user?.savedListings?.includes(listing._id),
  );

  useEffect(() => {
    setIsSaved(user?.savedListings?.includes(listing._id));
  }, [user, listing._id]);

  const handleSave = async () => {
    if (!user) {
      setToast("Details");
      return;
    }
    const res = await fetch(`/api/listings/save/${listing._id}`, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      setIsSaved(data.saved);
      setToast(
        data.saved
          ? "Listing Saved ❤️"
          : "Details",
      );
    }
  };

  const handleOffer = () => {
    if (!user) {
      setToast("Details");
      return;
    }
    setShowOfferModal(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: listing.title,
      text: `Check this swap on TRA.DE: ${listing.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    }

    await navigator.clipboard.writeText(window.location.href);
    setToast("Link copied");
  };

  const nextImage = () =>
    setCurrentImageIndex((p) => (p + 1) % listing.images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (p) => (p - 1 + listing.images.length) % listing.images.length,
    );

  const isOwner = user?._id === listing.owner?._id;
  const isExchanged = listing.isTraded || listing.status === "EXCHANGED";
  const type = listing.listingType || (listing.isVIP ? "VIP" : "NORMAL");
  const isVip = type === "VIP";
  const isSilver = type === "SILVER";
  const isExclusive = type === "EXCLUSIVE";
  const wantsService =
    listing.wantedType === "service" && Boolean(listing.serviceWanted);
  const wantedItems =
    wantsService && listing.serviceWanted
      ? [listing.serviceWanted]
      : Array.isArray(listing.wantedItems)
        ? listing.wantedItems.filter(Boolean)
        : [];
  const wantsTheme = isExclusive
    ? {
        panel:
          "linear-gradient(135deg, #4c1d95 0%, #7c3aed 52%, #06b6d4 100%)",
        border: "1px solid rgba(124,58,237,0.42)",
        label: "#ffffff",
        chipBg: "rgba(255,255,255,0.18)",
        chipBorder: "1px solid rgba(255,255,255,0.28)",
        chipText: "#ffffff",
      }
    : isVip
      ? {
          panel:
            "linear-gradient(135deg, #7c4a03 0%, #c8820a 50%, #f3d37a 100%)",
          border: "1px solid rgba(200,130,10,0.42)",
          label: "#fff7d6",
          chipBg: "rgba(255,255,255,0.2)",
          chipBorder: "1px solid rgba(255,255,255,0.3)",
          chipText: "#fffdf4",
        }
      : isSilver
        ? {
            panel:
              "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 52%, #f8fafc 100%)",
            border: "1px solid rgba(100,116,139,0.3)",
            label: "#334155",
            chipBg: "rgba(255,255,255,0.84)",
            chipBorder: "1px solid rgba(100,116,139,0.28)",
            chipText: "#334155",
          }
        : wantsService
          ? {
              panel: "#ffffff",
              border: "1px solid rgba(100,116,139,0.18)",
              label: "#0f766e",
              chipBg: "#ffffff",
              chipBorder: "1px solid rgba(15,118,110,0.2)",
              chipText: "#0f766e",
            }
          : {
              panel: "#ffffff",
              border: "1px solid rgba(100,116,139,0.18)",
              label: "#475569",
              chipBg: "#ffffff",
              chipBorder: "1px solid rgba(100,116,139,0.18)",
              chipText: "#334155",
            };
  const openOfferTheme = {
    panel: "#ffffff",
    border: "1px solid rgba(100,116,139,0.18)",
    chipText: "#4f46e5",
  };
  const serviceBadgeTheme = {
    background: isExclusive ? "rgba(255,255,255,0.2)" : isVip || isSilver ? "rgba(255,255,255,0.78)" : "rgba(15,118,110,0.12)",
    color: isExclusive ? "#ffffff" : "#0f766e",
    border: isExclusive
      ? "1px solid rgba(255,255,255,0.28)"
      : isVip || isSilver
      ? "1px solid rgba(255,255,255,0.34)"
      : "1px solid rgba(15,118,110,0.22)",
  };
  const detailSurface = isVip
    ? "linear-gradient(145deg, #fffdf4 0%, #fff8e6 46%, #ffffff 100%)"
    : isExclusive
      ? "linear-gradient(145deg, #ffffff 0%, #f5f3ff 46%, #ecfeff 100%)"
      : isSilver
      ? "linear-gradient(145deg, #ffffff 0%, #f8fbff 42%, #edf4fb 100%)"
      : C.bg;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor(diff / 60000);
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return `${mins} minutes ago`;
  };

  return (
    <div
      style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
      className="pb-20"
    >
      <div
        className="rounded-[18px] p-3 md:p-4"
        style={{
          background: detailSurface,
          border: `1px solid ${
            isExclusive
              ? "rgba(124,58,237,0.42)"
              : isVip
              ? "rgba(200,130,10,0.42)"
              : isSilver
                ? "rgba(100,116,139,0.32)"
                : C.border
          }`,
          boxShadow: "0 20px 50px rgba(17,24,39,0.07)",
        }}
      >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ══ details ══ */}
        <div className="space-y-4">
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group"
            style={{ background: C.bg2, border: `1px solid ${C.border}` }}
          >
            {isExchanged && (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-[2px]"
                style={{ background: "rgba(255,255,255,0.7)" }}
              >
                <div
                  className="transform -rotate-12 px-8 py-3 rounded-xl"
                  style={{
                    border: "3px solid #ef4444",
                    background: "rgba(239,68,68,0.08)",
                  }}
                >
                  <span
                    className="text-3xl font-black uppercase tracking-[0.2em]"
                    style={{ color: "#ef4444" }}
                  >
                    Exchanged
                  </span>
                </div>
              </div>
            )}

            <img
              src={
                listing.images?.[currentImageIndex] ||
                "https://picsum.photos/seed/item/800/600"
              }
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {listing.images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    color: C.text,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    color: C.text,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {isVip && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 text-white"
                style={{ background: C.gold }}
              >
                ⭐ VIP
              </div>
            )}
            {isExclusive && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md text-white"
                style={{
                  background: "linear-gradient(135deg, #6d28d9, #06b6d4)",
                }}
              >
                EXCLUSIVE
              </div>
            )}
            {isSilver && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md text-white"
                style={{
                  background: "linear-gradient(135deg, #314155, #d8e0e7)",
                }}
              >
                SILVER
              </div>
            )}
          </div>

          {listing.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {listing.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all"
                  style={{
                    border: `2px solid ${currentImageIndex === idx ? C.green : C.border}`,
                    opacity: currentImageIndex === idx ? 1 : 0.55,
                  }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ══ details ══ */}
        <div className="space-y-5">
          {/* badge + details */}
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-3 flex-wrap"
              style={{ color: C.text3 }}
            >
              <span
                className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                style={
                  listing.condition === "NEW"
                    ? {
                        background: C.greenLight,
                        color: C.green,
                        border: `1px solid rgba(26,138,74,0.2)`,
                      }
                    : {
                        background: C.bg3,
                        color: C.text3,
                        border: `1px solid ${C.border}`,
                      }
                }
              >
                {listing.condition === "NEW" ? "New" : "Used"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-xs">
                <Clock size={13} /> {timeAgo(listing.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-xs">
                <Eye size={13} /> {listing.views || 0} views
              </span>
            </div>
            <h1
              className="text-3xl font-black tracking-tight mb-3"
              style={{ color: C.text, letterSpacing: "-0.5px" }}
            >
              {listing.title}
            </h1>
            <div className="flex items-center gap-2" style={{ color: C.text2 }}>
              <MapPin size={16} style={{ color: "#ef4444" }} />
              <span className="font-medium text-sm">{listing.city}</span>
            </div>
          </div>

          {/* ── details details ── */}
          <div
            className="hidden"
            style={{ background: C.bg2, border: `1px solid ${C.border}` }}
          >
            <TradePeriodInfo listing={listing} />
          </div>

          {/* Description */}
          <div
            className="rounded-2xl p-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,248,0.94))",
              border: "1px solid rgba(100,116,139,0.18)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.82)",
            }}
          >
            <h3 className="font-bold text-base mb-3" style={{ color: C.text }}>
              Description
            </h3>
            <p
              className="whitespace-pre-wrap leading-relaxed text-sm"
              style={{ color: C.text2 }}
            >
              {listing.description}
            </p>
          </div>

          {/* Trade details */}
          <div
            className="rounded-2xl p-5"
            style={{
              background:
                wantedItems.length > 0 ? wantsTheme.panel : openOfferTheme.panel,
              border:
                wantedItems.length > 0 ? wantsTheme.border : openOfferTheme.border,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            <h3
              className="font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 mb-3"
              style={{
                color:
                  wantedItems.length > 0 ? wantsTheme.label : openOfferTheme.chipText,
                textShadow:
                  wantedItems.length > 0
                    ? "0 1px 8px rgba(15,23,42,0.28)"
                    : "none",
              }}
            >
              <RefreshCw size={13} /> Wanted
            </h3>
            <div className="flex flex-wrap gap-2">
              {wantsService && listing.serviceWanted ? (
                <span
                  className="px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2"
                  style={{
                    background: wantsTheme.chipBg,
                    color: wantsTheme.chipText,
                    border: wantsTheme.chipBorder,
                  }}
                >
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                    style={serviceBadgeTheme}
                  >
                    SERVICE SWAPS
                  </span>
                  {listing.serviceWanted}
                </span>
              ) : wantedItems.length > 0 ? (
                wantedItems.map((item: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold"
                    style={{
                      background: wantsTheme.chipBg,
                      color: wantsTheme.chipText,
                      border: wantsTheme.chipBorder,
                    }}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-bold"
                  style={{
                    color: isExclusive ? "#ffffff" : openOfferTheme.chipText,
                    border: "1px solid rgba(99,102,241,0.24)",
                  }}
                >
                  Open to offers
                </span>
              )}
            </div>
          </div>
          {/* details */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full overflow-hidden shrink-0"
                  style={{ border: `1px solid ${C.border}`, background: C.bg3 }}
                >
                  {listing.owner?.avatar ? (
                    <img
                      src={listing.owner.avatar}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={20} style={{ color: C.text3 }} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: C.text }}>
                    @
                    {listing.owner?.username ||
                      listing.owner?.name?.split(" ")[0]?.toLowerCase() ||
                      "user"}
                  </p>
                  <p className="text-xs" style={{ color: C.text3 }}>
                    User
                  </p>
                </div>
              </div>
              {!isOwner && !isExchanged && (
                <button
                  onClick={handleOffer}
                  className="px-6 py-3 rounded-xl font-black transition-all flex items-center gap-2 text-sm text-white"
                  style={{
                    background: "#111111",
                    border: `1px solid ${C.green}`,
                    boxShadow: "0 10px 24px rgba(17,17,17,0.14)",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      C.green)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#111111")
                  }
                >
                  <MessageCircle size={18} /> Offer
                </button>
              )}
            </div>
          </div>

          {/* details */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 text-sm"
              style={
                isSaved
                  ? {
                      background: "#ef4444",
                      color: "#fff",
                      border: "1px solid #ef4444",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }
                  : {
                      background: C.bg2,
                      color: C.text2,
                      border: `1px solid ${C.border}`,
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }
              }
            >
              <Heart size={18} className={cn(isSaved && "fill-current")} />
              {isSaved ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 text-sm"
              style={{
                background: C.bg2,
                color: C.text2,
                border: `1px solid ${C.border}`,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>
      </div>
      </div>

      {showOfferModal && (
        <OfferModal
          listing={listing}
          onClose={() => setShowOfferModal(false)}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

