import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure the correct path to your CSS file

const HomePage = () => {
  console.log('HomePage is rendering');
  
  return (
    <div className="hm-container">
      <header className="home-header">
        

        <div className="home-content">
          <h1 className="home-title">Welcome to JobQuest</h1>
          <p className="home-subtitle">Your gateway to finding the best jobs.</p>
          <div className="home-buttons">
            <Link to="/login">
              <button className="home-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="home-btn">Sign Up</button>
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="illustration">
          <img src="src\assets\bgh.png" alt="Illustration" />
        </div>
      </header>
    </div>
  )
}

export default HomePage;
