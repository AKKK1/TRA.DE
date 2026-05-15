"use client";

import Link from "next/link";

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
};

const stats = [
  { value: "10,000+", label: "User" },
  { value: "15", label: "Category" },
  { value: "2026", label: "Founded" },
  { value: "0 €", label: "Commission" },
];

const faqs = [
  {
    q: "What is TRA.DE?",
    a: "TRA.DE exchange platform",
  },
  {
    q: "Who can use it?",
    a: "TRA.DE exchange platform",
  },
  {
    q: "Is it safe?",
    a: "TRA.DE exchange platform",
  },
  {
    q: "How much is VIP?",
    a: "SILVER is €15, VIP is €30, and standard listings are free.",
  },
  {
    q: "How does trading work?",
    a: "TRA.DE exchange platform",
  },
  {
    q: "TRA.DE exchange platform",
    a: "Yes. Use city filters to find people nearby.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-50"
        style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link
            href="/"
            className="text-[17px] font-bold tracking-tight"
            style={{ color: C.text, textDecoration: "none" }}
          >
            TRA.DE<span style={{ color: C.green }}>.GE</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/rules"
              className="transition-colors text-[13px] font-medium"
              style={{ color: C.text2, textDecoration: "none" }}
            >
              Rules
            </Link>
            <Link
              href="/advertise"
              className="transition-colors text-[13px] font-medium hidden sm:block"
              style={{ color: C.text2, textDecoration: "none" }}
            >
              Advertising
            </Link>
            <Link
              href="/"
              className="text-white px-4 py-[7px] rounded-lg text-[13px] font-semibold transition-all"
              style={{ background: C.green, textDecoration: "none" }}
            >
              Home
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: C.bg2, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full text-[12px] font-medium mb-6"
            style={{
              background: C.greenLight,
              border: `1px solid rgba(26,138,74,0.2)`,
              color: C.green,
            }}
          >
            🇬🇪 Made in Georgia
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ letterSpacing: "-0.5px" }}
          >
            Trade <span style={{ color: C.green }}>made simple</span>
          </h1>
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: C.text2 }}
          >
            TRA.DE — Germany trade trade trade
            trade trade. trade Phone, trade, trade —
            trade trade.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="text-white px-6 py-3 rounded-lg text-[14px] font-semibold transition-all"
              style={{ background: C.green, textDecoration: "none" }}
            >
              trade →
            </Link>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg text-[14px] font-medium transition-all"
              style={{
                border: `1px solid ${C.border}`,
                color: C.text2,
                textDecoration: "none",
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-10 px-6"
        style={{ borderBottom: `1px solid ${C.border}`, background: C.bg }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold mb-1" style={{ color: C.green }}>
                {s.value}
              </p>
              <p
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: C.text3 }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 px-6" style={{ background: C.bg2 }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-3"
                style={{ color: C.green }}
              >
                Our mission
              </p>
              <h2
                className="text-3xl font-bold mb-4 leading-tight"
                style={{ letterSpacing: "-0.3px" }}
              >
                All trade <span style={{ color: C.green }}>Trade</span>
              </h2>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: C.text2 }}
              >
                Germany trade trade trade trade trade.
                trade trade trade trade trade, trade trade trade
                trade.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text2 }}>
                TRA.DE-trade trade trade trade trade — trade
                trade trade Trade trade, trade trade trade.
              </p>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: "🔄",
                  title: "15 Category",
                  desc: "From phones to real estate",
                },
                {
                  icon: "🔒",
                  title: "Safer exchanges",
                  desc: "Verification plus contact after agreement",
                },
                {
                  icon: "⚡",
                  title: "Fast process",
                  desc: "Post in minutes, receive offers quickly",
                },
                {
                  icon: "💰",
                  title: "Free service",
                  desc: "Standard listing: €0",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all"
                  style={{ background: C.bg, border: `1px solid ${C.border}` }}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p
                      className="text-sm font-bold mb-0.5"
                      style={{ color: C.text }}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs" style={{ color: C.text3 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Tags ── */}
      <section
        className="py-10 px-6"
        style={{
          background: C.bg,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-4 text-center"
            style={{ color: C.green }}
          >
            Popular searches
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Phone swaps",
              "Car swaps",
              "Clothing swaps",
              "Electronics swaps",
              "Home item swaps",
              "Sports gear",
              "Book swaps",
              "Kids items",
              "Kitchen appliances",
              "Trade in Berlin",
              "Trade in Hamburg",
              "Trade in Munich",
              "barter Germany",
              "free item exchange",
              "unused items",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs transition-all cursor-default"
                style={{
                  background: C.bg2,
                  border: `1px solid ${C.border}`,
                  color: C.text3,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6" style={{ background: C.bg2 }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-2 text-center"
            style={{ color: C.green }}
          >
            FAQ
          </p>
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{ letterSpacing: "-0.3px" }}
          >
            FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl transition-all"
                style={{ background: C.bg, border: `1px solid ${C.border}` }}
              >
                <p
                  className="font-bold text-sm mb-2 flex items-start gap-2"
                  style={{ color: C.text }}
                >
                  <span style={{ color: C.green }}>Q.</span>
                  {faq.q}
                </p>
                <p
                  className="text-sm leading-relaxed pl-5"
                  style={{ color: C.text2 }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="py-16 px-6"
        style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: C.green }}
          >
            Contact
          </p>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ letterSpacing: "-0.3px" }}
          >
            Get in touch
          </h2>
          <p className="text-sm mb-8" style={{ color: C.text2 }}>
            Questions, ideas, or partnership? We are here.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: "📧",
                label: "Email",
                value: "gamitsvale@gmail.com",
                href: "mailto:gamitsvale@gmail.com",
              },
              {
                icon: "📱",
                label: "Phone",
                value: "+995 593 71 60 80",
                href: "tel:+995593716080",
              },
              {
                icon: "👥",
                label: "TRA.DE exchange platform",
                value: "TRA.DE Community",
                href: "https://www.facebook.com/groups/1465431608622052",
              },
            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all group"
                style={{
                  background: C.bg2,
                  border: `1px solid ${C.border}`,
                  textDecoration: "none",
                }}
              >
                <span className="text-3xl">{c.icon}</span>
                <div className="text-center">
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: C.text3 }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-xs font-bold break-all"
                    style={{ color: C.text }}
                  >
                    {c.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs" style={{ color: C.text3 }}>
            TRA.DE © 2024–2025 · All rights reserved
          </p>
        </div>
      </section>
    </div>
  );
}
