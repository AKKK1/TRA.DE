"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Phone, Facebook, ChevronRight, ArrowRight } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const STATS = [
  { value: "10,000+", label: "User" },
  { value: "15", label: "Category" },
  { value: "0€", label: "Commission" },
  { value: "2026", label: "Founded" },
];

const FEATURES = [
  {
    icon: "🔄",
    title: "Trade without cash",
    desc: "TRA.DE exchange platform",
  },
  {
    icon: "🛡️",
    title: "Safer contact",
    desc: "Contact details are shared only after both sides agree. Email verification is required.",
  },
  {
    icon: "📱",
    title: "Mobile ready",
    desc: "Optimized for iOS and Android with PWA support.",
  },
  {
    icon: "⭐",
    title: "VIP Listings",
    desc: "TRA.DE exchange platform",
  },
  {
    icon: "🏙️",
    title: "15 categories",
    desc: "Electronics, vehicles, real estate, clothing, tools, services, and more.",
  },
  {
    icon: "🌍",
    title: "Across Germany",
    desc: "TRA.DE exchange platform",
  },
];

const CONTACT = [
  {
    icon: <Mail size={18} className="text-gold shrink-0" />,
    label: "Email",
    value: "gamitsvale@gmail.com",
    href: "mailto:gamitsvale@gmail.com",
    copy: true,
  },
  {
    icon: <Phone size={18} className="text-gold shrink-0" />,
    label: "Phone",
    value: "+995 593 716 080",
    href: "tel:+995593716080",
    copy: true,
  },
  {
    icon: <Facebook size={18} className="text-gold shrink-0" />,
    label: "TRA.DE exchange platform",
    value: "TRA.DE official group",
    href: "https://www.facebook.com/groups/1465431608622052",
    copy: true,
  },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* ── Nav ── */}
      <div className="border-b border-dark-border bg-dark/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tighter">
            TRA.DE<span className="text-gold">.GE</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white">About</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* bg glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        {/* sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/30"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}

        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div {...fade(0)}>
            <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-[11px] font-black uppercase tracking-[0.2em] rounded-full border border-gold/20 mb-6">
              Germany #1 trade trade
            </span>
          </motion.div>
          <motion.h1
            {...fade(0.1)}
            className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.05]"
          >
            trade trade
            <br />
            <span className="text-gold">trade trade</span>
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
            TRA.DE — trade trade trade TextmonthText Textday trade
            trade, trade trade All trade trade. trade trade. trade
            trade.
          </motion.p>
          <motion.div
            {...fade(0.3)}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-gold text-dark font-black rounded-xl hover:brightness-110 transition-all text-sm uppercase tracking-widest"
            >
              trade Trade <ArrowRight size={16} />
            </Link>
            <a
              href="https://www.facebook.com/groups/1465431608622052"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-dark-border text-zinc-300 font-bold rounded-xl hover:border-gold/40 hover:text-white transition-all text-sm"
            >
              <Facebook size={16} /> Facebook trade
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-4 border-y border-dark-border bg-dark-card/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...fade(i * 0.08)}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-black text-gold mb-1">
                {s.value}
              </p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fade(0)} className="text-center mb-14">
            <h2 className="text-3xl font-black mb-4">
              trade <span className="text-gold">TRA.DE</span>?
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Germany trade trade trade — trade trade,
              trade trade trade trade. trade trade trade trade.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...fade(i * 0.07)}
                className="bg-dark-card border border-dark-border rounded-2xl p-5 hover:border-gold/30 transition-all group"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-black text-white mb-2 text-sm group-hover:text-gold transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO content block ── */}
      <section className="py-16 px-4 bg-dark-card/20 border-y border-dark-border">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade(0)}>
            <h2 className="text-2xl font-black mb-6 text-center">
              Trade <span className="text-gold">Germany</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
              <p>
                <strong className="text-white">TRA.DE</strong> trade
                Germany trade trade trade trade.
                trade trade trade trade, trade
                trade trade{" "}
                <strong className="text-white">trade Trade</strong> —
                trade-trade trade.
              </p>
              <p>
                trade trade trade{" "}
                <strong className="text-white">
                  trade, trade, Real estate, trade, trade
                  trade, trade, trade, trade trade trade
                </strong>{" "}
                trade trade trade. trade Users trade trade —
                trade trade trade trade Contact trade trade.
              </p>
              <p>
                trade trade{" "}
                <strong className="text-white">
                  trade, trade, trade, trade
                </strong>{" "}
                trade Germany All trade. Registration trade trade trade{" "}
                <strong className="text-white">trade trade</strong>.
              </p>
              <p>
                trade days — trade trade trade trade, trade trade trade trade
                trade. <strong className="text-gold">trade!</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade(0)} className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Contact</h2>
            <p className="text-zinc-500 text-sm">
              trade, offer trade trade — Get in touch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {CONTACT.map((c, i) => (
              <motion.a
                key={c.label}
                {...fade(i * 0.1)}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="flex flex-col items-center text-center gap-3 p-5 bg-dark-card border border-dark-border rounded-2xl hover:border-gold/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  {c.icon}
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">
                    {c.label}
                  </p>
                  <p className="text-sm text-white font-bold break-all">
                    {c.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* JSON-LD structured data for local business */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TRA.DE",
                url: "https://TRA.DE",
                description: "TRA.DE exchange platform",
                email: "gamitsvale@gmail.com",
                telephone: "+995593716080",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "GE",
                  addressLocality: "Berlin",
                },
                sameAs: ["https://www.facebook.com/groups/1465431608622052"],
              }),
            }}
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 border-t border-dark-border">
        <div className="max-w-xl mx-auto text-center">
          <motion.div {...fade(0)}>
            <p className="text-gold text-[11px] font-black uppercase tracking-[0.2em] mb-4">
              trade trade?
            </p>
            <h2 className="text-4xl font-black mb-4">
              trade <span className="text-gold">Trade</span> days
            </h2>
            <p className="text-zinc-500 text-sm mb-8">
              Registration 30 trade trade. trade.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-sm"
            >
              Trade trade <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
