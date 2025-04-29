import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';
// Importer le logo depuis le dossier assets
import pokemonLogo from '../assets/pokemon-logo.png';

function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="pokemon-logo-container">
          <img src={pokemonLogo} alt="Pokémon Logo" className="pokemon-logo" />
        </div>
        
        <h1>Explorez l'univers des Pokémon</h1>
        
        {!currentUser ? (
          <>
            <p className="landing-description">
              Bienvenue dans votre Pokédex personnel. Consultez la collection, ajoutez vos propres Pokémon 
              et devenez un collectionneur de cartes Pokémon.
            </p>
            
            <div className="landing-features">
              <Link to="/collection" className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Vitrine</h3>
                <p>Découvrez toutes les cartes Pokémon disponibles</p>
              </Link>
              
              <Link to="/create" className="feature-card">
                <div className="feature-icon">➕</div>
                <h3>Créez</h3>
                <p>Ajoutez et personnalisez vos propres Pokémon</p>
              </Link>
              
              <Link to="/signup" className="feature-card">
                <div className="feature-icon">🎴</div>
                <h3>Collectionnez</h3>
                <p>Constituez votre collection de cartes Pokémon rares</p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="landing-description">
              Ravi de vous revoir, <strong>{currentUser.username}</strong> ! Continuez votre aventure Pokémon.
            </p>
            
            <div className="landing-features">
              <Link to="/collection" className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Vitrine</h3>
                <p>Découvrez toutes les cartes Pokémon disponibles</p>
              </Link>
              
              <Link to="/booster" className="feature-card">
                <div className="feature-icon">🎁</div>
                <h3>Ouvrir un booster</h3>
                <p>Découvrez de nouvelles cartes rares</p>
              </Link>
              
              <Link to="/my-cards" className="feature-card">
                <div className="feature-icon">🎴</div>
                <h3>Mes Cartes</h3>
                <p>Consultez votre collection de cartes rares</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LandingPage; 