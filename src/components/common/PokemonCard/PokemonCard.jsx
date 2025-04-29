import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, showStatus = false }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img 
          src={pokemon.image || `/src/assets/pokemons/${pokemon.id}.png`} 
          alt={pokemon.name.french} 
        />
      </div>
      <div className="pokemon-info">
        <h3>{pokemon.name.french}</h3>
        <div className="pokemon-types">
          {pokemon.type.map((type, index) => (
            <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
              {type}
            </span>
          ))}
        </div>
        <div className="pokemon-stats">
          <div className="stat">
            <span>HP</span>
            <div className="stat-bar">
              <div 
                className="stat-fill" 
                style={{ width: `${(pokemon.base.HP / 255) * 100}%` }}
              ></div>
            </div>
            <span>{pokemon.base.HP}</span>
          </div>
          <div className="stat">
            <span>Att</span>
            <div className="stat-bar">
              <div 
                className="stat-fill" 
                style={{ width: `${(pokemon.base.Attack / 255) * 100}%` }}
              ></div>
            </div>
            <span>{pokemon.base.Attack}</span>
          </div>
          <div className="stat">
            <span>Def</span>
            <div className="stat-bar">
              <div 
                className="stat-fill" 
                style={{ width: `${(pokemon.base.Defense / 255) * 100}%` }}
              ></div>
            </div>
            <span>{pokemon.base.Defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 