"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/components/AuthProvider";
import { ArrowRight, Boxes, Sparkles, Wrench } from "lucide-react";

const C = {
  green: "#1a8a4a",
  greenDark: "#125e33",
  greenLight: "#e6f5ec",
  border: "#e8ebe8",
  text: "#111111",
  text2: "#555555",
  text3: "#888888",
  silver: "#9ca3af",
  silverLight: "#f3f6f7",
  serviceA: "#0f766e",
  serviceB: "#1a8a4a",
};

function useCategoryCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/listings?counts=1")
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d === "object" && !Array.isArray(d)) setCounts(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { counts, loading };
}

function CountBadge({
  catId,
  counts,
  loading,
  light = false,
}: {
  catId: string;
  counts: Record<string, number>;
  loading: boolean;
  light?: boolean;
}) {
  if (loading) {
    return (
      <span
        className="inline-block h-2.5 w-8 rounded-full"
        style={{ background: light ? "rgba(255,255,255,0.3)" : C.border }}
      />
    );
  }

  return (
    <span className="text-[11px] font-medium" style={{ color: light ? "rgba(255,255,255,0.82)" : C.text3 }}>
      <strong style={{ color: light ? "#fff" : C.green }}>{counts[catId] ?? 0}</strong> listings
    </span>
  );
}

const FEATURED_CAT_IDS = [
  "electronics",
  "clothing",
  "tools",
  "books",
  "art",
  "vehiclesreal",
  "realestate",
  "other",
  "games",
  "home",
  "agriculture",
  "carParts",
  "kids",
  "sports",
  "animals",
  "beauty",
  "vehicles",
  "services",
];

export default function CategoriesSection() {
  const { counts, loading } = useCategoryCounts();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const featuredCats = CATEGORIES.filter((c) => FEATURED_CAT_IDS.includes(c.id));

  return (
    <section id="categories-section" className="scroll-mt-24 px-4 py-8" style={{ background: "#fff", borderBottom: `1px solid ${C.border}` }}>
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[18px] font-extrabold" style={{ color: C.text }}>
              <Boxes size={20} color={C.green} />
              Where can you trade?
            </div>
            <div className="mt-1 text-[13px]" style={{ color: C.text3 }}>
              Browse categories, service swaps, and local offers across Germany.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAllCategories((v) => !v)}
            className="hidden rounded-full px-4 py-2 text-[13px] font-bold sm:inline-flex"
            style={{ color: C.green, border: `1px solid rgba(26,138,74,0.22)`, background: C.greenLight }}
          >
            {showAllCategories ? "Collapse" : "All categories"}
          </button>
        </div>

        <div
          className="mb-5 overflow-hidden rounded-[16px] p-4"
          style={{
            border: "1px solid rgba(15,118,110,0.22)",
            background:
              "linear-gradient(135deg, rgba(15,118,110,0.08), rgba(26,138,74,0.12) 48%, rgba(255,255,255,0.9))",
          }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[14px] font-extrabold" style={{ color: C.text }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg, ${C.serviceA}, ${C.serviceB})` }}>
                  <Wrench size={16} />
                </span>
                Service swaps
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white" style={{ background: C.serviceA }}>
                  Skill based
                </span>
              </div>
              <p className="mt-1 text-[12px]" style={{ color: C.text2 }}>
                Trade a skill for an item, or offer an item in exchange for a service.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                href: "/category/serviceToThing",
                icon: "🧰",
                label: "Service for item",
                text: "Offer your skill and receive something useful.",
                catId: "serviceToThing",
              },
              {
                href: "/category/thingToService",
                icon: "🎯",
                label: "Item for service",
                text: "Swap an item for repair, design, delivery, lessons, and more.",
                catId: "thingToService",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <div
                  className="group flex min-h-[86px] items-center gap-3 rounded-[13px] p-3 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #1a8a4a)",
                    boxShadow: "0 14px 34px rgba(15,118,110,0.16)",
                  }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/16 text-[24px]">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold leading-tight text-white">{item.label}</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-white/78">{item.text}</div>
                    <CountBadge catId={item.catId} counts={counts} loading={loading} light />
                  </div>
                  <ArrowRight size={17} color="#fff" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateRows: showAllCategories ? "1fr" : "0fr",
            transition: "grid-template-rows .25s ease",
            overflow: "hidden",
          }}
        >
          <div style={{ minHeight: 0 }}>
            <div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
              {featuredCats.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.id}`} style={{ textDecoration: "none" }}>
                  <div
                    className="flex min-h-[96px] flex-col items-center justify-center rounded-[12px] px-2 py-3 text-center transition-all"
                    style={{
                      background: cat.id === "services" ? "linear-gradient(135deg, rgba(15,118,110,0.1), rgba(26,138,74,0.15))" : "#f8faf8",
                      border: cat.id === "services" ? "1px solid rgba(15,118,110,0.24)" : `1px solid ${C.border}`,
                    }}
                  >
                    <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-[10px] bg-white text-[17px]">
                      {cat.icon}
                    </span>
                    <span className="mb-1 line-clamp-2 text-[10px] font-bold leading-tight" style={{ color: C.text }}>
                      {cat.name}
                    </span>
                    <CountBadge catId={cat.id} counts={counts} loading={loading} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowAllCategories((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-5 py-2 text-[13px] font-bold transition-all"
            style={{
              color: C.green,
              border: `1px solid rgba(26,138,74,0.25)`,
              background: "transparent",
            }}
          >
            {showAllCategories ? "Hide categories" : "View all categories"} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
