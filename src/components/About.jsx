import React from "react";
import '../css/About.css'
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="about">
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          Welcome to <span className="highlight">FoodSaver NGO</span>, an organization dedicated to reducing food waste and fighting hunger. We believe that surplus food should be redirected to those in need instead of being discarded.
        </p>
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          Our mission is to create a sustainable and efficient food redistribution system that minimizes waste and maximizes social impact. By partnering with restaurants, grocery stores, and food producers, we ensure that excess food reaches underprivileged communities.
        </p>
        <h2 className="about-subtitle">Why Manage Food Waste?</h2>
        <ul className="about-list">
          <li><span className="highlight">Reduces Hunger:</span> Millions of people go hungry while food is wasted daily. Redistribution helps those in need.</li>
          <li><span className="highlight">Environmental Protection:</span> Food waste in landfills produces methane, a harmful greenhouse gas. Managing waste helps reduce emissions.</li>
          <li><span className="highlight">Economic Benefits:</span> Reducing food waste saves money for businesses and households.</li>
          <li><span className="highlight">Efficient Resource Use:</span> Growing and transporting food requires water, land, and energy. Reducing waste conserves these resources.</li>
          <li><span className="highlight">Supports Sustainability:</span> Managing waste food aligns with sustainable practices and responsible consumption.</li>
        </ul>
        <h2 className="about-subtitle">Get Involved</h2>
        <p className="about-text">
          Whether you're a business looking to donate surplus food, a volunteer eager to help, or a supporter of sustainable practices, we welcome you to join our cause. Together, we can make a difference.
        </p>
        
        <Link to='/contact'>
        <button className="about-button">contact</button>
        </Link>
        
      </div>
    </div>
    </div>
  );
};

export default About;