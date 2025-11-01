// src/components/Footer.js
export default function Footer() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h4>mettà muse</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Stories</a></li>
                <li><a href="#">Artisans</a></li>
                <li><a href="#">Boutiques</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">EU Compliances Docs</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>QUICK LINKS</h4>
              <ul>
                <li><a href="#">Orders & Shipping</a></li>
                <li><a href="#">Join/Login as a Seller</a></li>
                <li><a href="#">Payment & Pricing</a></li>
                <li><a href="#">Return & Refunds</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>FOLLOW US</h4>
              <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
                <a href="#" style={{ width: 32, height: 32, border: '1px solid #666', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Instagram SVG */}
                </a>
                <a href="#" style={{ width: 32, height: 32, border: '1px solid #666', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* LinkedIn SVG */}
                </a>
              </div>
              <h4 style={{ marginTop: '2rem' }}>mettà muse ACCEPTS</h4>
              <div className="payment-badges">
                <div className="payment-badge">Google Pay</div>
                <div className="payment-badge">Mastercard</div>
                <div className="payment-badge">PayPal</div>
                <div className="payment-badge blue">AMEX</div>
                <div className="payment-badge">Apple Pay</div>
                <div className="payment-badge purple">DPay</div>
              </div>
            </div>
          </div>
          <div className="copyright">
            Copyright © 2023 mettamuse. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }