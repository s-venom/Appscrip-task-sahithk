// src/components/ProductListing.js
"use client";

import { useState, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState('recommended');
  const [wishlist, setWishlist] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  // Fetch
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=20')
      .then(r => r.json())
      .then(data => {
        const enriched = data.map((p, i) => ({
          ...p,
          isNew: i % 3 === 0,
          isOutOfStock: i % 5 === 0 && i % 3 !== 0,
        }));
        setProducts(enriched);
        setFiltered(enriched);
      });
  }, []);

  // Mobile detect
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const applyFilters = (f, c) => {
    let res = [...products];
    if (f['Ideal For']?.length) {
      res = res.filter(p => {
        if (f['Ideal For'].includes('Men')) return p.category === "men's clothing";
        if (f['Ideal For'].includes('Women')) return p.category === "women's clothing";
        return false;
      });
    }
    setFiltered(res);
  };

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-low-high') return a.price - b.price;
    if (sort === 'price-high-low') return b.price - a.price;
    if (sort === 'newest') return b.id - a.id;
    if (sort === 'popular') return b.rating.count - a.rating.count;
    return 0;
  });

  return (
    <section style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => setFiltersOpen(!filtersOpen)} style={{ display: 'flex', gap: '.5rem', fontSize: '.875rem', fontWeight: 500 }}>
            <Filter size={16} />
            {filtersOpen ? 'HIDE' : 'FILTERS'}
          </button>
          <span style={{ fontSize: '.875rem', color: '#666' }}>{sorted.length} ITEMS</span>
        </div>

        <div style={{ position: 'relative' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '.25rem', fontSize: '.875rem', fontWeight: 500 }}>
            <span>
              {sort === 'recommended' && 'RECOMMENDED'}
              {sort === 'price-low-high' && 'PRICE: LOW TO HIGH'}
              {sort === 'price-high-low' && 'PRICE: HIGH TO LOW'}
              {sort === 'newest' && 'NEWEST FIRST'}
              {sort === 'popular' && 'POPULAR'}
            </span>
            <ChevronDown size={16} />
          </button>
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '.5rem', background: '#fff', border: '1px solid #eee', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,.1)', display: 'none', zIndex: 20 }}
            onMouseEnter={e => e.currentTarget.style.display = 'block'}
            onMouseLeave={e => e.currentTarget.style.display = 'none'}>
            {['recommended', 'newest', 'popular', 'price-low-high', 'price-high-low'].map(k => (
              <button key={k} onClick={() => setSort(k)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '.5rem 1rem', fontSize: '.875rem' }}>
                {sort === k && '✓ '}
                {k === 'recommended' && 'Recommended'}
                {k === 'newest' && 'Newest First'}
                {k === 'popular' && 'Popular'}
                {k === 'price-low-high' && 'Price: Low to High'}
                {k === 'price-high-low' && 'Price: High to Low'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {(filtersOpen || !mobile) && <ProductFilters onChange={applyFilters} />}
        <div style={{ flex: 1 }}>
          <div className="product-grid">
            {sorted.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onWishlistToggle={() => setWishlist(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                isSignedIn={signedIn}
                onSignIn={() => setSignedIn(true)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}