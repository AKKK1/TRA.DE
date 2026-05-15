"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // details cookie
    const cookieConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));

    if (!cookieConsent) {
      // details cookie details details, details popup
      setTimeout(() => setIsVisible(true), 1000); // 1 details details details
    }
  }, []);

  const handleAccept = () => {
    // details cookie 1 details details
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `cookieConsent=accepted; path=/; expires=${expiryDate.toUTCString()}`;
    setIsVisible(false);
  };

  const handleDecline = () => {
    // details cookie "declined" details
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `cookieConsent=declined; path=/; expires=${expiryDate.toUTCString()}`;
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* details (backdrop) */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
        role="alertdialog"
        aria-labelledby="cookie-title"
      >
        <div className="bg-dark-card border-2 border-gold rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">🍪</span>
            <div>
              <h2
                id="cookie-title"
                className="text-lg font-black text-white tracking-tight"
              >
                Cookies and privacy
              </h2>
            </div>
          </div>

          {/* details */}
          <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
            We use essential cookies for authentication and security.
            Your personal data is protected and not shared. Details:{" "}
            <a
              href="/legal"
              className="text-gold hover:underline font-semibold"
            >
              Privacy policy
            </a>
          </p>

          {/* details */}
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-3 bg-dark border border-zinc-600 text-white font-black rounded-lg hover:bg-dark/80 transition-all duration-200 text-sm uppercase tracking-widest"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-3 bg-gold text-dark font-black rounded-lg hover:brightness-110 transition-all duration-200 text-sm uppercase tracking-widest shadow-lg"
            >
              Allow
            </button>
          </div>

          {/* Close details */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsVisible(false)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
