import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">Pokédex</Link>
        <Link to="/collection" className="nav-link">Vitrine</Link>
        {currentUser && (
          <>
            <Link to="/booster" className="nav-link">Booster</Link>
            <Link to="/my-cards" className="nav-link">Mes Cartes</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <>
            <span className="user-welcome">Bonjour, {currentUser.username}</span>
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Connexion</Link>
            <Link to="/signup" className="nav-link signup-link">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 