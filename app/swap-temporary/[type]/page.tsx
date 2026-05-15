// app/swap-temporary/[type]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Header from "@/components/Header";
import ListingCard from "@/components/ListingCard";
import OfferModal from "@/components/OfferModal";
import Toast from "@/components/Toast";
import {
  Loader2,
  X,
  Download,
  CheckCircle2,
  Filter,
  ChevronDown,
  HeartHandshake,
} from "lucide-react";

const GOLD = "#c8820a";
const GOLD_LIGHT = "#fffdf4";
const GREEN = "#1a8a4a";
const GREEN_LIGHT = "#e6f5ec";
const BORDER = "#e8ebe8";
const BG = "#f8faf8";

// ── per-type config ───────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<
  string,
  {
    catId: string;
    title: string;
    icon: string;
    description: string;
    objectLabel: string; // "Temporary swap details" | "Temporary swap details"
    objectPlaceholder: string;
  }
> = {
  vehicles: {
    catId: "vehicles",
    title: "Temporary swap details",
    icon: "🚗",
    description:
      "Temporary swap details",
    objectLabel: "Temporary swap details",
    objectPlaceholder: "Temporary swap details",
  },
  realestate: {
    catId: "realestate",
    title: "Temporary swap details",
    icon: "🏠",
    description:
      "Temporary swap details",
    objectLabel: "Temporary swap details",
    objectPlaceholder: "Temporary swap details",
  },
};

// ── swap swap swap ────────────────────────────────────────
interface ContractForm {
  owner_name: string;
  owner_id: string;
  user_name: string;
  user_id: string;
  object_desc: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  condition_desc: string;
  insurance: string;
  fine: string;
  extra: string;
  owner_email: string;
  user_email: string;
}

const EMPTY_FORM: ContractForm = {
  owner_name: "",
  owner_id: "",
  user_name: "",
  user_id: "",
  object_desc: "",
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  condition_desc: "",
  insurance: "",
  fine: "",
  extra: "",
  owner_email: "",
  user_email: "",
};

// ── Input swap ─────────────────────────────────────────────────────────
function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  rows,
}: {
  label: string;
  id: keyof ContractForm;
  value: string;
  onChange: (id: keyof ContractForm, v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    padding: "8px 11px",
    fontSize: 13,
    outline: "none",
    fontFamily: "'Space Grotesk', sans-serif",
    boxSizing: "border-box",
    background: "#fff",
    color: "#111",
    lineHeight: 1.5,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>
        {label}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          style={{ ...base, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          style={base}
        />
      )}
    </div>
  );
}

// ── swap. swap ──────────────────────────────────────────────────────
function generateContract(
  f: ContractForm,
  config: (typeof TYPE_CONFIG)[string],
  typeKey: string,
): string {
  const line = "─".repeat(60);
  const dbl = "═".repeat(60);
  const now = new Date().toLocaleDateString("ka-GE");

  return [
    dbl,
    "Temporary swap details",
    `               GAMITSVALE.GE — ${config.title}`,
    dbl,
    `Temporary swap details`,
    "",
    "Temporary swap details",
    line,
    `Temporary swap details`,
    `Temporary swap details`,
    "",
    `Temporary swap details`,
    `Temporary swap details`,
    "",
    "Temporary swap details",
    line,
    "Temporary swap details",
    `${config.objectLabel}: ${f.object_desc || "___________________"}`,
    "",
    "Temporary swap details",
    line,
    `Temporary swap details`,
    `Temporary swap details`,
    "",
    "Temporary swap details",
    line,
    "Temporary swap details",
    f.condition_desc ||
      "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    "Temporary swap details",
    "Temporary swap details",
    "Temporary swap details",
    "Temporary swap details",
    "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    "Temporary swap details",
    "Temporary swap details",
    "Temporary swap details",
    "Temporary swap details",
    "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    f.insurance || "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    f.fine ||
      "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    "Temporary swap details",
    "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    f.extra ||
      "Temporary swap details",
    "",
    "Temporary swap details",
    line,
    `Temporary swap details`,
    `Temporary swap details`,
    "",
    ...(f.owner_email || f.user_email
      ? [
          "Temporary swap details",
          f.owner_email ? `Temporary swap details` : "",
          f.user_email ? `Temporary swap details` : "",
          "",
        ]
      : []),
    dbl,
    "Temporary swap details",
    dbl,
  ].join("\n");
}

// ── swap: swap swap ────────────────────────────────────────────
function ContractModal({
  config,
  typeKey,
  onClose,
}: {
  config: (typeof TYPE_CONFIG)[string];
  typeKey: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ContractForm>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const set = useCallback((id: keyof ContractForm, v: string) => {
    setForm((p) => ({ ...p, [id]: v }));
  }, []);

  const handleDownload = () => {
    const text = generateContract(form, config, typeKey);
    const blob = new Blob(["\uFEFF" + text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gamitsvale_contract_${typeKey}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("done");
    setTimeout(() => setStatus("idle"), 3000);
  };

  // Section header
  const SH = ({ n, title }: { n: string; title: string }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "18px 0 10px",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: GOLD,
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {n}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#111",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: BORDER }} />
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* modal */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "#fff",
          borderRadius: 20,
          border: `1.5px solid ${GOLD}`,
          width: "100%",
          maxWidth: 620,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 22px 14px",
            borderBottom: `1px solid ${BORDER}`,
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 5,
            borderRadius: "20px 20px 0 0",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>⚖️</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Temporary item use agreement
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#999", margin: "2px 0 0 26px" }}>
              Fill in the fields and download the .txt for print and signature
              required
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#999",
              padding: 4,
              borderRadius: 8,
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "4px 22px 22px" }}>
          {/* §1 swap */}
          <SH n="1" title="Temporary swap details" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 14px",
            }}
          >
            <Field
              label="Temporary swap details"
              id="owner_name"
              value={form.owner_name}
              onChange={set}
              placeholder="Temporary swap details"
            />
            <Field
              label="Temporary swap details"
              id="owner_id"
              value={form.owner_id}
              onChange={set}
              placeholder="01234567890"
            />
            <Field
              label="Temporary swap details"
              id="user_name"
              value={form.user_name}
              onChange={set}
              placeholder="Temporary swap details"
            />
            <Field
              label="Temporary swap details"
              id="user_id"
              value={form.user_id}
              onChange={set}
              placeholder="09876543210"
            />
          </div>

          {/* §2 swap */}
          <SH n="2" title="Temporary swap details" />
          <Field
            label={`Temporary swap details`}
            id="object_desc"
            value={form.object_desc}
            onChange={set}
            placeholder={config.objectPlaceholder}
            rows={2}
          />

          {/* §3 swap */}
          <SH n="3" title="Temporary swap details" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 1fr 120px",
              gap: "8px 10px",
            }}
          >
            <Field
              label="Temporary swap details"
              id="start_date"
              type="date"
              value={form.start_date}
              onChange={set}
            />
            <Field
              label="Temporary swap details"
              id="start_time"
              type="time"
              value={form.start_time}
              onChange={set}
            />
            <Field
              label="Temporary swap details"
              id="end_date"
              type="date"
              value={form.end_date}
              onChange={set}
            />
            <Field
              label="Temporary swap details"
              id="end_time"
              type="time"
              value={form.end_time}
              onChange={set}
            />
          </div>

          {/* §4 Condition */}
          <SH n="4" title="Temporary swap details" />
          <Field
            label="Temporary swap details"
            id="condition_desc"
            value={form.condition_desc}
            onChange={set}
            placeholder="Temporary swap details"
            rows={3}
          />

          {/* §7 swap */}
          <SH n="7" title="Temporary swap details" />
          <Field
            label="Temporary swap details"
            id="insurance"
            value={form.insurance}
            onChange={set}
            placeholder="Temporary swap details"
            rows={2}
          />

          {/* §8 swap */}
          <SH n="8" title="Temporary swap details" />
          <Field
            label="Temporary swap details"
            id="fine"
            value={form.fine}
            onChange={set}
            placeholder="Temporary swap details"
          />

          {/* §10 swap */}
          <SH n="10" title="Temporary swap details" />
          <Field
            label="Temporary swap details"
            id="extra"
            value={form.extra}
            onChange={set}
            placeholder="platformis wesi, komisia, disclaimerebi..."
            rows={2}
          />

          {/* swap.swap */}
          <SH n="✉" title="Temporary swap details" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 14px",
            }}
          >
            <Field
              label="Temporary swap details"
              id="owner_email"
              type="email"
              value={form.owner_email}
              onChange={set}
              placeholder="owner@example.com"
            />
            <Field
              label="Temporary swap details"
              id="user_email"
              type="email"
              value={form.user_email}
              onChange={set}
              placeholder="user@example.com"
            />
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            style={{
              marginTop: 20,
              width: "100%",
              background: status === "done" ? GREEN : GOLD,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background .2s",
            }}
          >
            {status === "done" ? (
              <>
                <CheckCircle2 size={16} /> Agreement downloaded
              </>
            ) : (
              <>
                <Download size={16} /> Download agreement (.txt)
              </>
            )}
          </button>
          <p
            style={{
              fontSize: 10,
              color: "#bbb",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            .txt format: print and signature required
          </p>
        </div>
      </div>
    </div>
  );
}

// ── swap ──────────────────────────────────────────────────────────────────
interface Filters {
  condition: string;
  sort: string;
}

function FiltersBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const selStyle: React.CSSProperties = {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    padding: "7px 10px",
    fontSize: 13,
    color: "#111",
    outline: "none",
    cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif",
    appearance: "none",
    paddingRight: 28,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          color: "#999",
          fontSize: 13,
        }}
      >
        <Filter size={14} /> Filter:
      </div>

      {/* condition */}
      <div style={{ position: "relative" }}>
        <select
          value={filters.condition}
          onChange={(e) => onChange({ ...filters, condition: e.target.value })}
          style={selStyle}
        >
          <option value="">Any condition</option>
          <option value="NEW">swap</option>
          <option value="USED">swap</option>
        </select>
        <ChevronDown
          size={13}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#999",
          }}
        />
      </div>

      {/* sort */}
      <div style={{ position: "relative" }}>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          style={selStyle}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <ChevronDown
          size={13}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#999",
          }}
        />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SwapTemporaryPage() {
  const params = useParams();
  const typeKey = (params?.type as string) ?? "vehicles";
  const config = TYPE_CONFIG[typeKey] ?? TYPE_CONFIG.vehicles;

  const { user } = useAuth();

  const [listings, setListings] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showOffer, setShowOffer] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    condition: "",
    sort: "newest",
  });

  const PAGE_SIZE = 20;

  const buildUrl = (pageNum: number, f: Filters) => {
    const p = new URLSearchParams({
      category: config.catId,
      tradePeriod: "temporary",
      page: String(pageNum),
      limit: String(PAGE_SIZE),
      sort: f.sort,
    });
    if (f.condition) p.set("condition", f.condition);
    return `/api/listings?${p}`;
  };

  const fetchListings = async (pageNum = 1, reset = false, f = filters) => {
    reset ? setLoading(true) : setLoadingMore(true);
    const res = await fetch(buildUrl(pageNum, f));
    const data = await res.json();
    const t = parseInt(res.headers.get("X-Total-Count") || "0", 10);
    setTotal(t);
    setHasMore(pageNum * PAGE_SIZE < t);

    const arr: any[] = Array.isArray(data) ? data : [];
    const sorted = [...arr].sort((a, b) => {
      const rank = (l: any) =>
        l.listingType === "VIP" || l.isVIP
          ? 0
          : l.listingType === "SILVER"
            ? 1
            : 2;
      return rank(a) - rank(b);
    });

    reset ? setListings(sorted) : setListings((prev) => [...prev, ...sorted]);
    setPage(pageNum);
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchListings(1, true, filters);
  }, [config.catId]);

  const handleFiltersChange = (f: Filters) => {
    setFilters(f);
    fetchListings(1, true, f);
  };

  const requireAuth = (action: () => void) => {
    if (!user) {
      setToast("Temporary swap details");
      return;
    }
    action();
  };

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Header onAddListing={() => {}} onSearch={() => {}} />

      <div className="max-w-[1100px] mx-auto px-4 py-8">
        {/* ← Home */}
        <Link
          href="/"
          style={{
            color: GREEN,
            fontSize: 13,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 20,
          }}
        >
          ← Home
        </Link>

        {/* Hero banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a3c34 0%, #2d6a4f 100%)",
            borderRadius: 16,
            padding: "28px 28px 24px",
            marginBottom: 28,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: 20,
          }}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{config.icon}</div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 8px",
              }}
            >
              {config.title}
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 14px",
              }}
            >
              {config.description}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: GOLD,
                borderRadius: 99,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              ⚖️ Legal swap swap
            </span>
          </div>

          {/* swap. swap */}
          <button
            onClick={() => setShowContract(true)}
            style={{
              background: GOLD,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "13px 22px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 16px rgba(200,130,10,0.35)",
              transition: "all .18s",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 24px rgba(200,130,10,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 16px rgba(200,130,10,0.35)";
            }}
          >
            <Download size={16} /> swap swap
          </button>
        </div>

        {/* Content */}
        <div>
          {/* Title + count */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#111",
                margin: 0,
              }}
            >
              Active listings
            </h2>
            {!loading && (
              <span style={{ fontSize: 12, color: "#999" }}>
                — <strong style={{ color: GOLD }}>{total}</strong> total
              </span>
            )}
          </div>

          {/* Filters */}
          <FiltersBar filters={filters} onChange={handleFiltersChange} />

          {/* Grid */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: `1px solid ${BORDER}`,
                    background: "#f8faf8",
                  }}
                >
                  <div style={{ aspectRatio: "4/3", background: "#f0f4f0" }} />
                  <div
                    style={{
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        height: 14,
                        borderRadius: 4,
                        background: "#f0f4f0",
                        width: "75%",
                      }}
                    />
                    <div
                      style={{
                        height: 11,
                        borderRadius: 4,
                        background: "#f0f4f0",
                        width: "50%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px dashed #ccc",
                borderRadius: 12,
                padding: 32,
                textAlign: "center",
                color: "#999",
                fontSize: 13,
              }}
            >
              <p style={{ fontSize: 36, marginBottom: 8 }}>{config.icon}</p>
              swap swap swap swap listing swap swap swap.
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 12,
                }}
              >
                {listings.map((listing, i) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    user={user}
                    index={i}
                    onOffer={() => requireAuth(() => setShowOffer(listing))}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={() => fetchListings(page + 1)}
                    disabled={loadingMore}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 24px",
                      borderRadius: 10,
                      border: `1px solid ${BORDER}`,
                      background: "#fff",
                      color: "#555",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />{" "}
                        Loading...
                      </>
                    ) : (
                      `Temporary swap details`
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Contract modal ── */}
      {showContract && (
        <ContractModal
          config={config}
          typeKey={typeKey}
          onClose={() => setShowContract(false)}
        />
      )}

      {showOffer && (
        <OfferModal listing={showOffer} onClose={() => setShowOffer(null)} />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
