// app/components/Footer.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h2 className="text-lg font-bold mb-4">BE THE FIRST TO KNOW</h2>
            <p className="text-gray-300 text-sm mb-6">Sign up for updates from mettà muse.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Enter your e-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 text-gray-900 text-sm focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 border border-gray-600 text-white font-semibold hover:border-white transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
            <p className="text-sm">+44 221 133 5360</p>
            <p className="text-sm">customercare@mettamuse.com</p>
            <h3 className="text-lg font-bold mt-8 mb-4">CURRENCY</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">United States</span>
              <span className="text-sm font-semibold">USD</span>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Transactions will be completed in Euros and a currency reference is available on hover.
            </p>
          </div>
          <div />
        </div>

        <hr className="border-gray-700 mb-12" />

        {/* Desktop Links */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
          {/* mettà muse */}
          <div>
            <h4 className="font-bold mb-4 text-sm">mettà muse</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["About Us", "Stories", "Artisans", "Boutiques", "Contact Us", "EU Compliancies Docs"].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "Orders & Shipping",
                "Join/Login as a Seller",
                "Payment & Pricing",
                "Return & Refunds",
                "FAQs",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-4 text-sm">FOLLOW US</h4>
            <div className="flex space-x-4 mb-8">
              {/* Instagram & LinkedIn SVG */}
            </div>
            <h4 className="font-bold mb-4 text-sm">mettà muse ACCEPTS</h4>
            <div className="flex flex-wrap gap-2">
              {["Google Pay", "Mastercard", "PayPal", "AMEX", "Apple Pay", "DPay"].map((pay) => (
                <div
                  key={pay}
                  className={`px-3 py-2 rounded text-xs font-semibold ${
                    pay === "AMEX" ? "bg-blue-600 text-white" : pay === "DPay" ? "bg-purple-600 text-white" : "bg-white text-gray-900"
                  }`}
                >
                  {pay}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-0 mb-8">
          {["metta", "links", "follow"].map((section) => (
            <div key={section}>
              <button
                onClick={() => toggle(section)}
                className="w-full flex justify-between items-center py-4 border-b border-gray-700 hover:text-gray-300"
              >
                <h4 className="font-bold text-sm">
                  {section === "metta" ? "mettà muse" : section === "links" ? "QUICK LINKS" : "FOLLOW US"}
                </h4>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expanded === section ? "rotate-180" : ""}`}
                />
              </button>
              {expanded === section && (
                <div className="py-4 border-b border-gray-700">
                  {/* Content similar to desktop */}
                </div>
              )}
            </div>
          ))}
        </div>

        <hr className="border-gray-700 mb-6" />
        <p className="text-center text-sm text-gray-400">
          Copyright © 2023 mettamuse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}