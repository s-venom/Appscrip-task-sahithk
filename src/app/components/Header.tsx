// app/components/Header.tsx
"use client";

import { useState } from "react";
import { Menu, X, Search, Heart, ShoppingBag, User, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white px-4 py-2 text-xs text-center">
        Fast & Free Shipping on Orders Over $50 • Sign In for Exclusive Deals
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="hidden sm:inline font-bold text-gray-900">mettà muse</span>
            </Link>
          </div>

          {/* Center: Logo (Mobile) */}
          <div className="md:hidden">
            <span className="font-bold text-lg text-gray-900">mettà muse</span>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Search">
              <Search className="w-5 h-5 text-gray-900" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Wishlist">
              <Heart className="w-5 h-5 text-gray-900" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
            </button>
            <button className="hidden md:flex items-center p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-900" />
            </button>
            <button className="hidden md:flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-gray-900">ENG</span>
              <ChevronDown className="w-4 h-4 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center space-x-10 h-10 items-center">
          {["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 pt-4 border-t border-gray-100 space-y-3">
            {["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="block text-sm font-medium text-gray-900 hover:text-gray-600"
              >
                {item}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}