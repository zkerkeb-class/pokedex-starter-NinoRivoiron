import React from 'react';
import './header.css';

function Header({ query, setQuery, setResults, numpokemon, setNumpokemon, isActive, setIsActive, selectedType, setSelectedType, pokemons }) {
  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    
    if (searchQuery.trim() === '') {
      setResults(pokemons);
    } else {
      const filteredResults = pokemons.filter(pokemon => 
        pokemon.name.french.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    
    if (type === '') {
      setResults(pokemons);
    } else {
      const filteredResults = pokemons.filter(pokemon => 
        pokemon.type.includes(type)
      );
      setResults(filteredResults);
    }
  };

  // Suppression du bouton Accueil - Il n'y a plus de bouton pour retourner à l'accueil ici
  
  return (
    <div className="header-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-container">
        <select 
          value={selectedType} 
          onChange={handleTypeChange}
          className="type-filter"
        >
          <option value="">Tous les types</option>
          <option value="Normal">Normal</option>
          <option value="Fire">Feu</option>
          <option value="Water">Eau</option>
          <option value="Grass">Plante</option>
          <option value="Electric">Électrique</option>
          <option value="Ice">Glace</option>
          <option value="Fighting">Combat</option>
          <option value="Poison">Poison</option>
          <option value="Ground">Sol</option>
          <option value="Flying">Vol</option>
          <option value="Psychic">Psy</option>
          <option value="Bug">Insecte</option>
          <option value="Rock">Roche</option>
          <option value="Ghost">Spectre</option>
          <option value="Dragon">Dragon</option>
          <option value="Dark">Ténèbres</option>
          <option value="Steel">Acier</option>
          <option value="Fairy">Fée</option>
        </select>
      </div>
    </div>
  );
}

export default Header; 