// src/components/ProductCard.js
import { Heart } from 'lucide-react';

export default function ProductCard({ product, isWishlisted, onWishlistToggle, isSignedIn, onSignIn }) {
  return (
    <div className="product-card">
      <div className="product-image" onClick={() => !isSignedIn && onSignIn()}>
        <img src={product.image} alt={`${product.title} - mettà muse product`} />
        {product.isNew && <div className="badge">NEW</div>}
        {product.isOutOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
        <button className="wishlist-btn" onClick={(e) => { e.stopPropagation(); onWishlistToggle(); }}>
          <Heart size={20} fill={isWishlisted ? 'red' : 'none'} stroke={isWishlisted ? 'red' : '#666'} />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {!isSignedIn ? (
          <p className="signin-prompt" onClick={onSignIn}>Sign in to see pricing</p>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
              <span style={{ fontSize: '.75rem', color: '#666' }}>
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
            <p style={{ fontSize: '.75rem', color: '#666', marginBottom: '.75rem' }}>
              {product.description.substring(0, 100)}...
            </p>
            <strong style={{ fontSize: '.875rem' }}>${product.price.toFixed(2)}</strong>
          </>
        )}
      </div>
    </div>
  );
}