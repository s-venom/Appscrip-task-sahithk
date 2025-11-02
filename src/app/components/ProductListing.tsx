// app/components/ProductListing.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { fetchProducts } from "../lib/fetchProducts";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  isNew?: boolean;
  isOutOfStock?: boolean;
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true); // desktop: open by default
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // mobile drawer
  const [sortBy, setSortBy] = useState("recommended");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});
  const [customizable, setCustomizable] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect screen size
  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setFiltersOpen(desktop); // auto-open on desktop
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch products
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // Filtering
  const filteredProducts = products.filter((p) => {
    if (activeFilters["Ideal For"]?.length) {
      const match = activeFilters["Ideal For"].some((f) => {
        if (f === "Men") return p.category === "men's clothing";
        if (f === "Women") return p.category === "women's clothing";
        return false;
      });
      if (!match) return false;
    }
    return true;
  });

  const sorted = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFiltersChange = (filters: { [key: string]: string[] }, customizable: boolean) => {
    setActiveFilters(filters);
    setCustomizable(customizable);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter & Sort Bar */}
      <div className={`sticky ${isDesktop ? 'top-32': 'top-24'} bg-white z-40 flex items-center justify-between mb-6 py-4 border-b border-gray-200`}>
        <div className="flex items-center space-x-4">
          {/* Desktop: HIDE/SHOW FILTERS */}
          {isDesktop && (
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="hidden lg:flex items-center space-x-2 text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>{filtersOpen ? "HIDE FILTERS" : "SHOW FILTERS"}</span>
            </button>
          )}

          {/* Mobile: FILTERS button */}
          {!isDesktop && (
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center space-x-2 text-sm font-medium lg:hidden"
            >
              <Filter className="w-4 h-4" />
              <span>FILTERS</span>
            </button>
          )}

          <span className="text-sm text-gray-600">{sorted.length} ITEMS</span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-1 text-sm font-medium">
            <span>
              {sortBy === "recommended"
                ? "RECOMMENDED"
                : sortBy === "price-low-high"
                ? "PRICE: LOW TO HIGH"
                : sortBy === "price-high-low"
                ? "PRICE: HIGH TO LOW"
                : "NEWEST FIRST"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block z-50">
            {[
              { key: "recommended", label: "Recommended" },
              { key: "newest", label: "Newest First" },
              { key: "price-low-high", label: "Price: Low to High" },
              { key: "price-high-low", label: "Price: High to Low" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  sortBy === opt.key ? "font-bold" : ""
                }`}
              >
                {sortBy === opt.key && "Checkmark "} {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-8 relative">
        {/* Desktop Sidebar */}
        {isDesktop && filtersOpen && (
          <ProductFilters onFiltersChange={handleFiltersChange} />
        )}

        {/* Mobile Filter Drawer */}
        {!isDesktop && mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-lg overflow-y-auto lg:hidden">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold">FILTERS</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <ProductFilters onFiltersChange={handleFiltersChange} />
              </div>
            </div>
          </>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <p className="text-center py-12 text-gray-600">Loading products...</p>
          ) : (
            <div className={`grid grid-cols-2 md:grid-cols-3 ${filtersOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
              {sorted.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onWishlistToggle={() => toggleWishlist(product.id)}
                  isSignedIn={isSignedIn}
                  onSignIn={() => setIsSignedIn(true)}
                />
              ))}
            </div> 
          )}
        </div>
      </div>
    </section>
  );
}