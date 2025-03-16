import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import {Link} from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">FoodSaver NGO</h1>
          <div className="header-buttons">
            <Link to="/dash">
            <button className="donate-button">Donate</button>
            </Link>
            <button className="home-button" onClick={() => navigate('/')}>Go to First Page</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Ending Food Waste. Nourishing Lives.</h2>
          <p className="hero-description">
            FoodSaver is a dedicated non-profit organization working to bridge the gap between food waste and hunger. 
            We partner with local businesses, volunteers, and donors to redirect surplus food to communities in need.
          </p>
          <Link to="/contact">
          <button className="join-button">Join Us</button>
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4" 
            alt="Food Donation" 
          />
        </div>
      </section>

      {/* Info Cards */}
      <section className="info-section">
        <div className="info-cards">
          <div className="info-card">
            <h3>Our Mission</h3>
            <p>We aim to connect surplus food with those who need it most through sustainable solutions.</p>
          </div>
          <div className="info-card">
            <h3>Get Involved</h3>
            <p>Volunteer, donate, or partner with us. Your support changes lives.</p>
          </div>
          <div className="info-card">
            <h3>Success Stories</h3>
            <p>Discover how rescued food is making a lasting difference in communities.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 FoodSaver NGO. Building a sustainable future together.</p>
      </footer>
    </div>
  );
};

export default Home;