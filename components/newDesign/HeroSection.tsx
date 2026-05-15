"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowRight, MapPin, Plus, RefreshCw, Search } from "lucide-react";
import { CATEGORIES } from "@/components/AuthProvider";

interface HeroSectionProps {
  onSearch?: (query: string, type: string, filters?: any) => void;
}

const C = {
  green: "#1a8a4a",
  greenDark: "#125e33",
  greenLight: "#e6f5ec",
  border: "#e8ebe8",
  text: "#111111",
  text2: "#555555",
  text3: "#777777",
  surface: "#f8faf8",
};

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(
      query,
      "want",
      selectedCategory ? { category: selectedCategory } : undefined,
    );
  };

  const scrollToCategories = () => {
    document
      .getElementById("categories-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative overflow-hidden px-4 pt-10 pb-8 md:pt-14 md:pb-12"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f8faf8 58%, #ffffff 100%)",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_430px]">
        <div className="text-left">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
            style={{
              background: C.greenLight,
              border: "1px solid rgba(26,138,74,0.22)",
              color: C.green,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: C.green, animation: "gv-blink 2s infinite" }}
            />
            Germany launch - DE / EN marketplace
          </div>

          <h1
            className="max-w-3xl text-[40px] font-extrabold leading-[1.02] md:text-[64px]"
            style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Have something?
            <span className="block" style={{ color: C.green }}>
              Trade it for what you want.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-7" style={{ color: C.text2 }}>
            A clean barter marketplace for Germany. List unused items, discover
            what people want nearby, and swap without cash.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 flex w-full max-w-2xl flex-col gap-2 rounded-[14px] p-2 sm:flex-row"
            style={{
              background: "#fff",
              border: `1px solid ${C.border}`,
              boxShadow: "0 18px 45px rgba(17, 24, 39, 0.08)",
            }}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
              <Search size={18} color={C.green} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items, wishes, or categories"
                className="min-h-11 min-w-0 flex-1 bg-transparent text-[14px] outline-none"
                style={{ color: C.text }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="min-h-11 rounded-[10px] bg-transparent px-3 text-[13px] outline-none"
              style={{ border: `1px solid ${C.border}`, color: C.text2 }}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-[14px] font-bold text-white"
              style={{ background: C.green }}
            >
              Explore <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Berlin", "Munich", "Hamburg", "Electronics", "Home"].map((item) => (
              <span
                key={item}
                className="rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.text3 }}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToCategories}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold md:hidden"
            style={{
              background: C.green,
              color: "#fff",
              boxShadow: "0 14px 30px rgba(26,138,74,0.24)",
            }}
          >
            Skip preview <ArrowDown size={15} style={{ animation: "gv-down 1.4s ease-in-out infinite" }} />
          </button>
        </div>

        <div
          className="relative rounded-[18px] p-4 max-md:mt-1"
          style={{
            background: "#fff",
            border: `1px solid ${C.border}`,
            boxShadow: "0 22px 55px rgba(17, 24, 39, 0.09)",
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase" style={{ color: C.green }}>
                Live swap preview
              </p>
              <p className="text-[12px]" style={{ color: C.text3 }}>
                Clear have / want structure
              </p>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: C.greenLight, color: C.green }}
            >
              <RefreshCw size={18} />
            </div>
          </div>

          <div
            className="rounded-[14px] p-3"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[12px] bg-[#e9f3ed]">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
                alt="Laptop for swap"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-bold" style={{ color: C.text }}>
                    MacBook Air 13
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-[12px]" style={{ color: C.text3 }}>
                    <MapPin size={12} color="#ef4444" /> Berlin
                  </p>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: C.greenLight, color: C.green }}
                >
                  Open
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${C.border}` }}>
                  <p className="text-[10px] font-bold uppercase" style={{ color: C.text3 }}>
                    I have
                  </p>
                  <p className="mt-1 text-[13px] font-semibold" style={{ color: C.text }}>
                    Laptop
                  </p>
                </div>
                <div className="rounded-[12px] p-3" style={{ background: C.greenLight, border: "1px solid rgba(26,138,74,0.22)" }}>
                  <p className="text-[10px] font-bold uppercase" style={{ color: C.green }}>
                    I want
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {["Bike", "Monitor"].map((item) => (
                      <span key={item} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold" style={{ color: C.greenDark }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[12px] px-4 py-3 text-[13px] font-bold text-white"
            style={{ background: C.green }}
          >
            <Plus size={16} /> Add your swap
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gv-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes gv-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
