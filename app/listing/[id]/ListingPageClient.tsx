"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import Header from "@/components/Header";
import ListingDetails from "@/components/ListingDetails";
import OfferModal from "@/components/OfferModal";
import Toast from "@/components/Toast";

const C = {
  bg: "#ffffff",
  bg2: "#f8faf8",
  bg3: "#f0f4f0",
  text: "#111111",
  text3: "#999999",
};

interface Props {
  id: string;
  initialListing: any;
}

export default function ListingPageClient({ id, initialListing }: Props) {
  const { user } = useAuth();
  const [listing, setListing] = useState<any>(initialListing);
  const [loading, setLoading] = useState(!initialListing);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (initialListing) return;
    fetch(`/api/listings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, initialListing]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: C.bg }}>
        <Header onAddListing={() => {}} />
        <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
          <div
            className="h-7 rounded-xl w-1/2 mb-5"
            style={{ background: C.bg3 }}
          />
          <div
            className="aspect-video rounded-2xl mb-4"
            style={{ background: C.bg2 }}
          />
          <div className="h-4 rounded-xl w-3/4" style={{ background: C.bg3 }} />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen" style={{ background: C.bg }}>
        <Header onAddListing={() => {}} />
        <div className="text-center py-24">
          <p className="text-lg font-bold" style={{ color: C.text3 }}>
            Listing not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        fontFamily: "'Manrope', 'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <Header onAddListing={() => {}} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <ListingDetails
          listing={listing}
          user={user}
          onOffer={() => {
            if (!user) {
              setToast("Please log in to send an offer.");
              return;
            }
            setShowOfferModal(true);
          }}
        />
      </main>

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
