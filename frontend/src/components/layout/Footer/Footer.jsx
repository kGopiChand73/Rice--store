import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row gy-4">

          <div className="col-12 col-md-6 col-lg-4 footer-col-store">
            <h3 className="footer-logo">🌾 Khadri Rice Store</h3>

            <p className="footer-description">
              Premium quality rice delivered directly from trusted farmers
              to your home with Cash on Delivery, WhatsApp Ordering and
              reliable customer support.
            </p>

            <div className="trust-badges">
              <span>🌾 Farm Fresh</span>
              <span>🚚 Fast Delivery</span>
              <span>💰 Cash on Delivery</span>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h5>Customer Support</h5>
            <ul className="footer-links">
              <li>📞 +91 97040 77705</li>
              <li className="footer-email">📧 support@khadriricestore.com</li>
              <li>🕒 Mon - Sat, 9AM - 8PM</li>
              <li>📍 Kadiri, Andhra Pradesh</li>
            </ul>
          </div>

          <div className="col-12 col-lg-3">
            <h5>Connect With Us</h5>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
                <span className="social-label">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
                <span className="social-label">Instagram</span>
              </a>
              <a href="https://wa.me/919704077705" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
                <span className="social-label">WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        <hr />

        <div className="footer-bottom">
          <p>© {year} <strong>Khadri Rice Store</strong>. All Rights Reserved.</p>
          <p>Made with ❤️ in Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
}