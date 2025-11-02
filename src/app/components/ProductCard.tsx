// app/components/ProductCard.tsx
"use client";
import { Heart } from "lucide-react";

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

interface Props {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  isSignedIn: boolean;
  onSignIn: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  isSignedIn,
  onSignIn,
}: Props) {
  return (
    <article className="group flex flex-col bg-white">
      <div
        className="relative bg-gray-100 aspect-square mb-3 overflow-hidden rounded-lg cursor-pointer"
        onClick={() => !isSignedIn && onSignIn()}
      >
        <img
          src={product.image}
          alt={`${product.title} - premium product`}
          className="w-full h-full object-contain group-hover:scale-95 transition-transform duration-300"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded">
            NEW PRODUCT
          </span>
        )}
        {product.isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-gray-900 text-sm font-bold">OUT OF STOCK</span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle();
          }}
          className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full hover:bg-gray-100"
        >
          <Heart
            className="w-6 h-6"
            fill={isWishlisted ? "red" : "none"}
            stroke={isWishlisted ? "red" : "currentColor"}
          />
        </button>
      </div>

      {!isSignedIn ? (
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 uppercase">
            {product.title}
          </h3>
          <button
            onClick={onSignIn}
            className="text-xs text-gray-600 hover:text-gray-900 underline mt-auto"
          >
            Sign in or Create an account to see pricing
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 uppercase">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">⭐ {product.rating.rate.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({product.rating.count})</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {product.description.substring(0, 100)}...
          </p>
          <div className="mt-auto">
            <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
          </div>
        </div>
      )}
    </article>
  );
}