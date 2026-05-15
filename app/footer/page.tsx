"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-dark-border bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ── Home Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* ── exchange + Description ── */}
          <div className="lg:col-span-1">
            <p className="text-xl font-black text-white tracking-tight mb-3">
              TRA.DE<span className="text-[#fffff]">.GE</span>
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Germany exchange exchange exchange — exchange exchange exchange
              exchange.
            </p>
          </div>

          {/* ── exchange ── */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">
              exchange
            </p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/rules", label: "Details" },
                { href: "/login", label: "Login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-gold transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── exchange ── */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">
              exchange
            </p>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/advertise", label: "Advertise with us" },
                { href: "/legal", label: "Privacy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-gold transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── exchange exchange ── */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">
              exchange
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/groups/1465431608622052"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-gold transition-colors font-medium group"
              >
                <div className="w-8 h-8 rounded-lg bg-dark border border-dark-border flex items-center justify-center group-hover:border-gold/30 transition-colors">
                  <Facebook size={15} />
                </div>
                Facebook Group
                <ExternalLink
                  size={11}
                  className="text-zinc-600 group-hover:text-gold/50"
                />
              </a>
              <a
                href="https://www.instagram.com/TRA.DE/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-gold transition-colors font-medium group"
              >
                <div className="w-8 h-8 rounded-lg bg-dark border border-dark-border flex items-center justify-center group-hover:border-gold/30 transition-colors">
                  <Instagram size={15} />
                </div>
                Instagram
                <ExternalLink
                  size={11}
                  className="text-zinc-600 group-hover:text-gold/50"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-zinc-600 font-medium">
            © {new Date().getFullYear()} TRA.DE — All exchange exchange
          </p>
          <p className="text-[11px] text-zinc-600 font-medium">
            exchange <span className="text-gold font-black">AK</span>-exchange exchange
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
