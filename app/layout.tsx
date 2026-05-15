import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
export const viewport: Viewport = {
  themeColor: "#D4A017",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
import CookieConsent from "@/components/cookie-consent";

export const metadata: Metadata = {
  title: {
    default: "TRA.DE — Swap marketplace",
    template: "%s | TRA.DE",
  },
  description: "Swap items and services without cash.",
  keywords: [
    "swap",
    "barter",
    "item swap",
    "barter",
    "trade items",
    "Germany",
    "swap marketplace",
  ],
  metadataBase: new URL("https://tra.de"),
  alternates: { canonical: "https://tra.de" },
  openGraph: {
    title: "TRA.DE - Swap marketplace",
    description: "Swap items and services without cash.",
    url: "https://tra.de",
    siteName: "TRA.DE",
    locale: "en_DE",
    type: "website",
    images: [
      { url: "https://gamitsvale.ge/og-image.jpg", width: 1200, height: 630 },
    ],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.png", // iOS home screen icon
  },
  // PWA manifest
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TRA.DE",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
        <CookieConsent />
        <Analytics />
        {/* Google OAuth */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />

        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(reg) {
                    console.log('SW registered');
                  })
                  .catch(function(err) {
                    console.log('SW failed:', err);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
