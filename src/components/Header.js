// src/components/Header.js
"use client";

import { useState } from 'react';
import { Menu, X, Search, Heart, ShoppingBag, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="header-top">
        Fast & Free Shipping on Orders Over $50 • Sign In for Exclusive Deals
      </div>
      <div className="container">
        <div className="header-main">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="icon-btn" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <a href="/" className="logo">
              <div className="logo-icon">M</div>
              <span style={{ display: 'none' }}>mettà muse</span>
            </a>
          </div>

          <nav className="nav-desktop">
            {['SHOP', 'SKILLS', 'STORIES', 'ABOUT', 'CONTACT US'].map(i => (
              <a key={i} href={`#${i.toLowerCase().replace(' ', '-')}`}>{i}</a>
            ))}
          </nav>

          <div className="icons">
            <button className="icon-btn"><Search size={20} /></button>
            <button className="icon-btn"><Heart size={20} /></button>
            <button className="icon-btn"><ShoppingBag size={20} /></button>
          </div>
        </div>

        {open && (
          <nav style={{ padding: '1rem 0', borderTop: '1px solid #eee' }}>
            {['SHOP', 'SKILLS', 'STORIES', 'ABOUT', 'CONTACT US'].map(i => (
              <a key={i} href={`#${i.toLowerCase().replace(' ', '-')}`} style={{ display: 'block', marginBottom: '.75rem', fontWeight: 500 }}>
                {i}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}