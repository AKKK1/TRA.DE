"use client";

import Link from "next/link";

const C = {
  bg: "#ffffff",
  bg2: "#f8faf8",
  green: "#1a8a4a",
  greenLight: "#e6f5ec",
  text: "#111111",
  text2: "#555555",
  text3: "#999999",
  border: "#e8ebe8",
};

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-6 rounded-xl"
      style={{ background: C.bg2, border: `1px solid ${C.border}` }}
    >
      <h2
        className="text-base font-bold mb-3 flex items-start gap-2"
        style={{ color: C.text }}
      >
        <span style={{ color: C.green }}>{num}.</span> {title}
      </h2>
      <div className="text-sm leading-relaxed" style={{ color: C.text2 }}>
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span style={{ color: C.green }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
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
        <div className="max-w-4xl mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link
            href="/"
            className="text-[17px] font-bold"
            style={{ color: C.text, textDecoration: "none" }}
          >
            TRA.DE<span style={{ color: C.green }}>.GE</span>
          </Link>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: C.text3 }}
          >
            Privacy
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ letterSpacing: "-0.3px" }}
          >
            Privacy <span style={{ color: C.green }}>policy</span>
          </h1>
          <p className="text-sm" style={{ color: C.text3 }}>
            Last updated: 2025 year · TRA.DE
          </p>
        </div>

        <div className="space-y-4">
          <Section num="1" title="General information">
            TRA.DE ("Platform") policy policy policy Privacy. policy
            policy policy, What information we collect, policy policy policy
            policy policy policy policy policy.
          </Section>

          <Section num="2" title="What information we collect">
            <BulletList
              items={[
                "Name and surname during registration",
                "Email address for account creation and verification",
                "TRA.DE policy details",
                "Optional social links for your profile",
                "TRA.DE policy details",
                "IP address and browser information for security",
              ]}
            />
          </Section>

          <Section num="3" title="Facebook Login">
            <p>policy Facebook-policy policy policy, policy policy:</p>
            <BulletList
              items={[
                "TRA.DE policy details",
                "TRA.DE policy details",
                "TRA.DE policy details",
              ]}
            />
            <p className="mt-3" style={{ color: C.text3 }}>
              policy policy policy Facebook policy policy policy policy Facebook-policy
              policy policy policy.
            </p>
          </Section>

          <Section num="4" title="Data use">
            <BulletList
              items={[
                "Account management and verification",
                "TRA.DE policy details",
                "Sending notifications",
                "Platform security and fraud prevention",
                "Service improvement",
              ]}
            />
          </Section>

          <Section num="5" title="Data sharing">
            <p>policy policy policy policy policy policy policy policy, policy:</p>
            <BulletList
              items={[
                "TRA.DE policy details",
                "TRA.DE policy details",
                "TRA.DE policy details",
                "When required by law",
              ]}
            />
          </Section>

          <Section num="6" title="TRA.DE policy details">
            <p>policy policy policy policy policy policy Delete:</p>
            <ul className="space-y-1.5 mt-2">
              <li className="flex items-start gap-2">
                <span style={{ color: C.green }}>•</span>
                policy Email:{" "}
                <a
                  href="mailto:gamitsvale@gmail.com"
                  style={{ color: C.green }}
                >
                  gamitsvale@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: C.green }}>•</span>
                policy: "Request data deletion" + policy Email
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: C.green }}>•</span>7 policy policy
                policy policy
              </li>
            </ul>
          </Section>

          <Section num="7" title="Cookies">
            policy policy HttpOnly cookie policy. policy cookie
            policy policy policy policy. policy policy policy policy
            policy, policy 30 days.
          </Section>

          <Section num="8" title="Contact">
            <div className="space-y-1">
              <p>
                📧{" "}
                <a
                  href="mailto:gamitsvale@gmail.com"
                  style={{ color: C.green }}
                >
                  gamitsvale@gmail.com
                </a>
              </p>
              <p>
                🌐{" "}
                <a href="https://TRA.DE" style={{ color: C.green }}>
                  TRA.DE
                </a>
              </p>
              <p>📍 policy: Germany</p>
            </div>
          </Section>
        </div>

        <div
          className="mt-12 pt-8 text-center"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest"
            style={{ background: C.green, textDecoration: "none" }}
          >
            ← Home Back
          </Link>
        </div>
      </main>
    </div>
  );
}
