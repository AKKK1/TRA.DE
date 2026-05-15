"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GEORGIAN_CITIES = [
  "Berlin",
  "Munich",
  "Hamburg",
  "Cologne",
  "Frankfurt",
  "Stuttgart",
  "Dusseldorf",
  "Leipzig",
  "Dortmund",
  "Essen",
  "Bremen",
  "Dresden",
  "Hanover",
  "Nuremberg",
  "Bonn",
];

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "serviceToThing", name: "Service for item", icon: "🧰" },
  { id: "thingToService", name: "Item for service", icon: "🎯" },
  { id: "vehicles", name: "Temporary vehicle swap", icon: "🚗" },
  { id: "vehiclesreal", name: "Vehicles", icon: "🛻" },
  { id: "realestate", name: "Real estate", icon: "🏠" },
  { id: "clothing", name: "Fashion & accessories", icon: "👗" },
  { id: "home", name: "Home & garden", icon: "🏡" },
  { id: "agriculture", name: "Agriculture", icon: "🌾" },
  { id: "tools", name: "Tools & equipment", icon: "🔧" },
  { id: "sports", name: "Sports & outdoors", icon: "⚽" },
  { id: "kids", name: "Kids & toys", icon: "🧸" },
  { id: "books", name: "Books & education", icon: "📚" },
  { id: "art", name: "Art & collectibles", icon: "🎨" },
  { id: "animals", name: "Pets", icon: "🐾" },
  { id: "beauty", name: "Beauty & wellness", icon: "💄" },
  { id: "services", name: "Services", icon: "🛠️" },
  { id: "games", name: "Games", icon: "🎮" },
  { id: "carParts", name: "Car parts", icon: "⚙️" },
  { id: "other", name: "Other", icon: "📦" },
];

interface RegisterExtra {
  lastName?: string;
  phone: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  telegram?: string;
}

interface AuthContextType {
  user: any;
  loading: boolean;
  loginWithGoogle: () => void;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    name: string,
    password: string,
    extra: RegisterExtra,
  ) => Promise<{ success: boolean; error?: string }>;
  verify: (
    email: string,
    code: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const loginWithGoogle = () => {
    const client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      scope: "email profile",
      callback: async (response: any) => {
        if (response.access_token) {
          const userInfo = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${response.access_token}` } },
          ).then((r) => r.json());

          const res = await fetch("/api/auth/google-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: userInfo.email,
              name: userInfo.name,
              avatar: userInfo.picture,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            window.location.href = "/profile?setup=1";
          }
        }
      },
    });
    client.requestAccessToken();
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      window.location.href = "/";
      return { success: true };
    }
    const err = await res.json();
    return { success: false, error: err.error };
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    extra: RegisterExtra,
  ) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        password,
        lastName: extra.lastName || "",
        phone: extra.phone,
        whatsapp: extra.whatsapp || "",
        telegram: extra.telegram || "",
      }),
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error };
  };

  const verify = async (email: string, code: string) => {
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      window.location.href = "/";
      return { success: true };
    }
    const err = await res.json();
    return { success: false, error: err.error };
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        login,
        register,
        verify,
        logout,
        refresh: fetchMe,
      }}
    >
      {children}
      {user?.onboardingCompleted === false && (
        <OnboardingModal user={user} onDone={fetchMe} />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

function OnboardingModal({
  user,
  onDone,
}: {
  user: any;
  onDone: () => Promise<void>;
}) {
  const slides = [
    {
      label: "Rules",
      title: "Trade with clear expectations",
      text: "Use real photos, write accurate details, and share contacts only after both sides agree.",
    },
    {
      label: "How it works",
      title: "Post, wait, accept",
      text: "Upload your listing, receive an offer notification, then unlock contact details after accepting.",
    },
    {
      label: "Profile",
      title: "Create your public swap identity",
      text: "Choose a username and add at least one contact method so accepted offers can reach you.",
    },
  ];
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    username: user.username || "",
    phone: user.phone || "",
    whatsapp: user.whatsapp || "",
    telegram: user.telegram || "",
  });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const current = slides[step];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!accepted) {
      setError("Please accept the rules to continue.");
      return;
    }
    if (
      !form.username.trim() ||
      (!form.phone.trim() &&
        !form.whatsapp.trim() &&
        !form.telegram.trim())
    ) {
      setError("Add a username and at least one contact method.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          onboardingCompleted: true,
          termsAccepted: true,
        }),
      });
      if (res.ok) {
        await onDone();
      } else {
        const data = await res.json();
        setError(data.error || "Could not save profile details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#f8faf8",
    border: "1px solid #e8ebe8",
    color: "#111111",
    outline: "none",
    fontFamily: "'Space Grotesk', sans-serif",
  } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
      <form
        onSubmit={submit}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ border: "1px solid #e8ebe8" }}
      >
        <div
          className="p-6 text-white"
          style={{
            background:
              step === 2
                ? "linear-gradient(135deg, #125e33, #1a8a4a)"
                : "linear-gradient(135deg, #111827, #1a8a4a)",
          }}
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
              {current.label}
            </span>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === step ? 20 : 7,
                    background: i === step ? "#fff" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold leading-tight">{current.title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/82">{current.text}</p>
        </div>

        <div className="space-y-4 p-6">
          {step === 0 && (
            <div className="space-y-3">
              {[
                "Use your own photos and describe the item or service honestly.",
                "Offers should be made inside TRA.DE before contacts are shared.",
                "Meet safely and confirm the final swap only when both sides agree.",
              ].map((rule) => (
                <div
                  key={rule}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#555555]"
                  style={{ background: "#f8faf8", border: "1px solid #e8ebe8" }}
                >
                  {rule}
                </div>
              ))}
              <label className="flex items-start gap-3 rounded-xl p-3 text-sm" style={{ background: "#eef8f1", border: "1px solid rgba(26,138,74,0.18)" }}>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1a8a4a]"
                />
                <span className="leading-5 text-[#125e33]">
                  I agree to the rules and understand that contact details are shared only after an accepted offer.
                </span>
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="rounded-2xl p-4" style={{ background: "#f8faf8", border: "1px solid #e8ebe8" }}>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { title: "Upload", icon: "↑", bg: "#e6f5ec" },
                  { title: "Wait", icon: "…", bg: "#fff8e6" },
                  { title: "Notify", icon: "!", bg: "#eef2ff" },
                  { title: "Accept", icon: "✓", bg: "#ecfdf5" },
                ].map((item, i) => (
                  <div key={item.title} className="relative">
                    <motion.div
                      animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.22 }}
                      className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black"
                      style={{ background: item.bg, color: i === 1 ? "#c8820a" : "#1a8a4a" }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#555555]">{item.title}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-white p-3 shadow-sm" style={{ border: "1px solid #e8ebe8" }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111111]">New offer received</span>
                  <span className="rounded-full bg-[#e6f5ec] px-2 py-0.5 text-[10px] font-bold text-[#1a8a4a]">Accept</span>
                </div>
                <div className="h-2 w-3/4 rounded bg-[#e8ebe8]" />
                <div className="mt-2 h-2 w-1/2 rounded bg-[#e8ebe8]" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5 sm:col-span-2">
                <span className="ml-1 text-[10px] font-bold uppercase tracking-widest text-[#999999]">
                  Username *
                </span>
                <input
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="yourname"
                  className="w-full rounded-xl px-4 py-3 text-sm"
                  style={inputStyle}
                />
              </label>
              {[
                { key: "phone", label: "Phone", placeholder: "+49 ..." },
                { key: "whatsapp", label: "WhatsApp", placeholder: "+49 ..." },
                { key: "telegram", label: "Telegram", placeholder: "@username" },
              ].map((field) => (
                <label key={field.key} className="space-y-1.5">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-widest text-[#999999]">
                    {field.label}
                  </span>
                  <input
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl px-4 py-3 text-sm"
                    style={inputStyle}
                  />
                </label>
              ))}
              <p className="text-[10px] text-[#999999] sm:col-span-2">
                Add at least one contact method: phone, WhatsApp, or Telegram.
              </p>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-40"
              style={{ border: "1px solid #e8ebe8", color: "#555555" }}
            >
              Back
            </button>
            {step < slides.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 0 && !accepted) {
                    setError("Please accept the rules to continue.");
                    return;
                  }
                  setError("");
                  setStep(step + 1);
                }}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white"
                style={{ background: "#1a8a4a" }}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                style={{ background: "#1a8a4a" }}
              >
                {loading ? "Saving..." : "Start trading"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
