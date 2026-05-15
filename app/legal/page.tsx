"use client";

import Link from "next/link";
import { useState } from "react";

const C = {
  bg: "#ffffff",
  bg2: "#f8faf8",
  green: "#1a8a4a",
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
          <span style={{ color: C.green }}>-</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
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
            TRA<span style={{ color: C.green }}>.DE</span>
          </Link>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: C.text3 }}
          >
            Legal documents
          </span>
        </div>
      </div>

      <div
        className="sticky top-[60px] z-40"
        style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-0">
            {[
              { id: "privacy", label: "Privacy" },
              { id: "terms", label: "Terms of service" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-6 py-4 font-bold uppercase text-xs tracking-widest border-b-2 transition-all"
                style={{
                  borderBottomColor:
                    activeTab === tab.id ? C.green : "transparent",
                  color: activeTab === tab.id ? C.green : C.text3,
                  background: "transparent",
                  cursor: "pointer",
                  marginBottom: -1,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {activeTab === "privacy" && (
          <div>
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-2">
                Privacy <span style={{ color: C.green }}>policy</span>
              </h1>
              <p className="text-sm" style={{ color: C.text3 }}>
                Last updated: 2026 year - TRA.DE
              </p>
            </div>
            <div className="space-y-4">
              <Section num="1" title="General information">
                TRA.DE ("Platform") respects your privacy. This policy explains
                what information we collect, how we use it, and how we protect
                your personal data.
              </Section>
              <Section num="2" title="What information we collect">
                <BulletList
                  items={[
                    "Name and surname during registration",
                    "Email address for account creation and verification",
                    "Phone number for communication between users",
                    "Optional social links for your profile",
                    "Listing photos stored through Cloudinary",
                    "IP address and browser information for security",
                  ]}
                />
              </Section>
              <Section num="3" title="Facebook Login">
                <p>If you use Facebook Login, we receive:</p>
                <BulletList
                  items={[
                    "Name for creating your profile",
                    "Profile photo for your avatar",
                    "Facebook ID for account identification",
                  ]}
                />
                <p className="mt-3" style={{ color: C.text3 }}>
                  We do not store your Facebook password and we do not post on
                  Facebook without your permission.
                </p>
              </Section>
              <Section num="4" title="Data use">
                <BulletList
                  items={[
                    "Account management and verification",
                    "Publishing listings and offers",
                    "Sending notifications",
                    "Platform security and fraud prevention",
                    "Service improvement",
                  ]}
                />
              </Section>
              <Section num="5" title="Data sharing">
                <p>We do not sell personal data. We share it only with:</p>
                <BulletList
                  items={[
                    "Cloudinary for image storage",
                    "MongoDB Atlas for database storage",
                    "Google/Facebook for OAuth authorization",
                    "Authorities when required by law",
                  ]}
                />
              </Section>
              <Section num="6" title="Data security">
                <BulletList
                  items={[
                    "Data is transmitted through HTTPS",
                    "Passwords are protected with bcrypt",
                    "The database is hosted in a secure MongoDB Atlas environment",
                    "Security is reviewed regularly",
                  ]}
                />
              </Section>
              <Section num="7" title="Data deletion">
                <p>You may request full deletion of your data:</p>
                <ul className="space-y-1.5 mt-2">
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.green }}>-</span>
                    Email us at{" "}
                    <a href="mailto:gamitsvale@gmail.com" style={{ color: C.green }}>
                      gamitsvale@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.green }}>-</span>
                    Include "Request data deletion" and your account email.
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.green }}>-</span>
                    We complete valid requests within 7 business days.
                  </li>
                </ul>
              </Section>
              <Section num="8" title="Cookies">
                We use HttpOnly cookies for authorization. These cookies are
                required for the platform to work correctly, do not contain
                personal information, and expire after 30 days.
              </Section>
              <Section num="9" title="Contact">
                <p>For questions, contact us:</p>
                <div className="space-y-1 mt-2">
                  <p>
                    Email:{" "}
                    <a href="mailto:gamitsvale@gmail.com" style={{ color: C.green }}>
                      gamitsvale@gmail.com
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <a href="https://TRA.DE" style={{ color: C.green }}>
                      TRA.DE
                    </a>
                  </p>
                  <p>Country: Germany</p>
                </div>
              </Section>
            </div>
          </div>
        )}

        {activeTab === "terms" && (
          <div>
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-2">
                Service <span style={{ color: C.green }}>terms</span>
              </h1>
              <p className="text-sm" style={{ color: C.text3 }}>
                Last updated: 2026 year - TRA.DE
              </p>
            </div>
            <div className="space-y-4">
              <Section num="1" title="Accepting the terms">
                By using TRA.DE, you agree to these terms and to the platform
                rules published on the Rules page.
              </Section>
              <Section num="2" title="Account responsibility">
                <BulletList
                  items={[
                    "You are responsible for accurate profile information.",
                    "You must keep your login details secure.",
                    "You may not use another person's account without permission.",
                  ]}
                />
              </Section>
              <Section num="3" title="Listings and offers">
                <BulletList
                  items={[
                    "Listings must describe real items or services accurately.",
                    "Photos must belong to you or be used with permission.",
                    "Offers must be honest and related to the listed item.",
                  ]}
                />
              </Section>
              <Section num="4" title="Prohibited actions">
                <BulletList
                  items={[
                    "Illegal goods, services, spam or fraud",
                    "Abusive, threatening or discriminatory language",
                    "Repeated duplicate listings",
                    "Attempts to bypass platform limits or security",
                    "Misleading users about item condition or ownership",
                  ]}
                />
              </Section>
              <Section num="5" title="Contact details">
                Contact details become visible only after an offer is accepted.
                Users are responsible for arranging the final swap safely and
                checking items before exchange.
              </Section>
              <Section num="6" title="Data requests">
                <p>For account or data requests:</p>
                <ul className="space-y-1.5 mt-2">
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.green }}>-</span>
                    <a href="mailto:gamitsvale@gmail.com" style={{ color: C.green }}>
                      gamitsvale@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.green }}>-</span>
                    Include the request type and your account email.
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.green }}>-</span>
                    We respond within 7 business days.
                  </li>
                </ul>
              </Section>
              <Section num="7" title="Liability limit">
                TRA.DE is provided as a platform for arranging swaps. We do not
                guarantee item quality, user behavior, or completion of an
                exchange.
              </Section>
              <Section num="8" title="Terms changes">
                We may update these terms. Important changes will be announced
                on the platform, and continued use means you accept the updated
                terms.
              </Section>
              <Section num="9" title="Contact">
                <div className="space-y-1">
                  <p>
                    Email:{" "}
                    <a href="mailto:gamitsvale@gmail.com" style={{ color: C.green }}>
                      gamitsvale@gmail.com
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <a href="https://TRA.DE" style={{ color: C.green }}>
                      TRA.DE
                    </a>
                  </p>
                  <p>Country: Germany</p>
                </div>
              </Section>
            </div>
          </div>
        )}

        <div
          className="mt-12 pt-8 text-center"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-widest transition-all"
            style={{ background: C.green, textDecoration: "none" }}
          >
            Back home
          </Link>
        </div>
      </main>
    </div>
  );
}
