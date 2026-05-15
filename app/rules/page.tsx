"use client";

import React from "react";
import Header from "@/components/Header";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  UserPlus,
  Search,
  MessageSquare,
  Handshake,
  Star,
  Upload,
  Bell,
  Phone,
} from "lucide-react";

const C = {
  bg: "#ffffff",
  bg2: "#f8faf8",
  bg3: "#f0f4f0",
  green: "#1a8a4a",
  greenLight: "#e6f5ec",
  text: "#111111",
  text2: "#555555",
  text3: "#999999",
  border: "#e8ebe8",
  gold: "#D4AF37",
  goldLight: "#FEF9E7",
};

function XCircle({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

const steps = [
  {
    icon: <UserPlus size={20} />,
    number: "01",
    title: "Create an account",
    description:
      "Create a free account with your name, email and password, or continue with Google. You can also add WhatsApp or Telegram so users can contact you after a confirmed swap.",
  },
  {
    icon: <Upload size={20} />,
    number: "02",
    title: "Post your item",
    description:
      'Add the item title, condition, photos and location. In "Wanted items", describe what you want in return. If you are open to ideas, write "send me an offer" and wait for suggestions.',
  },
  {
    icon: <Search size={20} />,
    number: "03",
    title: "Find what you want",
    description:
      "Browse listings on the homepage and use category, city and search filters to find relevant swaps faster.",
  },
  {
    icon: <MessageSquare size={20} />,
    number: "04",
    title: "Send an offer",
    description:
      'Open a listing and press "Offer". Describe what you want to trade and add photos if needed. You can send up to 3 offers on one listing and 15 offers per day to other users.',
  },
  {
    icon: <Bell size={20} />,
    number: "05",
    title: "Watch your notifications",
    description:
      "Check the bell button regularly. When someone likes your listing, they can send an offer. You can accept it, think about it, or decline it.",
  },
  {
    icon: <Handshake size={20} />,
    number: "06",
    title: "Accepting unlocks contact details",
    description:
      "After mutual agreement, the accepted offer shows the other user's phone, WhatsApp and Telegram in your profile. These buttons are visible only after acceptance.",
  },
  {
    icon: <Phone size={20} />,
    number: "07",
    title: "Contact and trade",
    description:
      "Use the unlocked contact details to agree on time, place and final swap terms. For safety, meet in a public place when possible.",
  },
  {
    icon: <Star size={20} />,
    number: "08",
    title: "Post your own listing too",
    description:
      "Use the Add listing button to publish your item. NORMAL is free, SILVER boosts a listing in its category, and VIP moves it to premium positions.",
  },
];

const temporarySteps = [
  'Open the dedicated page: "Transport temporary swap" or "Home swap".',
  "Fill in the agreement form with both parties' details.",
  "Download the .txt agreement, print it and sign it.",
  "The agreement protects both sides if any damage happens.",
];

export default function RulesPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <Header onAddListing={() => {}} onSearch={() => {}} />

      <main className="max-w-3xl mx-auto px-4 py-14">
        <div
          className="rounded-2xl p-8 mb-10 text-center"
          style={{ background: C.green }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            TRA.DE
          </p>
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            Got things you do not use?
            <br />
            <span style={{ color: "#A8E6BF" }}>Trade them for value.</span>
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            TRA.DE helps you swap items for items, items for services, or
            services for services.{" "}
            <strong className="text-white">No cash required.</strong>
          </p>
        </div>

        <div className="space-y-6">
          <section
            className="p-7 rounded-2xl"
            style={{ background: C.bg2, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div
                className="p-2 rounded-xl"
                style={{ background: C.greenLight, color: C.green }}
              >
                <BookOpen size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: C.text }}>
                  How to use the site
                </h2>
                <p className="text-xs mt-0.5" style={{ color: C.text3 }}>
                  Step-by-step guide
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: C.bg, border: `1px solid ${C.border}` }}
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: C.greenLight, color: C.green }}
                    >
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-3" style={{ background: C.border }} />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-bold tracking-widest"
                        style={{ color: C.green, opacity: 0.6 }}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-sm font-bold" style={{ color: C.text }}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: C.text2 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className="p-7 rounded-2xl"
            style={{ background: C.goldLight, border: `1.5px solid ${C.gold}` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="p-2 rounded-xl"
                style={{ background: C.gold, color: "#fff" }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: C.text }}>
                  Temporary swap
                </h2>
                <p className="text-xs mt-0.5" style={{ color: C.text3 }}>
                  Transport & home swaps, protected by an agreement
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {temporarySteps.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: C.text2 }}>
                  <span
                    className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: C.gold }}
                  >
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
            <p className="text-xs mt-4 pt-4" style={{ color: C.text3, borderTop: `1px solid rgba(212,175,55,0.3)` }}>
              Legal note: the agreement protects both parties. Any damage can be
              assessed and compensated according to the signed terms.
            </p>
          </section>

          <section
            className="p-7 rounded-2xl"
            style={{ background: C.bg2, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl" style={{ background: C.greenLight, color: C.green }}>
                <ShieldCheck size={22} />
              </div>
              <h2 className="text-lg font-bold" style={{ color: C.text }}>
                General rules
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                "One user can publish up to 3 free listings per day.",
                "Posting the same item repeatedly is not allowed.",
                "Listings must include real photos and an accurate description.",
                "Contact details become visible only after mutual agreement.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: C.text2 }}>
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" style={{ color: "#16a34a" }} />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section
            className="p-7 rounded-2xl"
            style={{ background: C.bg2, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
                <AlertCircle size={22} />
              </div>
              <h2 className="text-lg font-bold" style={{ color: C.text }}>
                Restrictions
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                "Illegal items or services are not allowed.",
                "Abusive language is not allowed.",
                "Spam and fraud may lead to a permanent account ban.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: C.text2 }}>
                  <XCircle size={17} className="shrink-0 mt-0.5 text-red-500" />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-7 rounded-2xl text-white" style={{ background: C.green }}>
            <h2 className="text-xl font-bold mb-3">Remember</h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              TRA.DE is only a platform for arranging swaps. We do not take
              responsibility for the swap process or item quality. Be careful,
              check items before exchanging, and meet in public places.
            </p>
            <a href="https://TRA.DE" className="inline-block mt-4 text-sm font-bold" style={{ color: "#A8E6BF" }}>
              TRA.DE &gt;
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
