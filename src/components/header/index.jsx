import { useState, useEffect } from "react";
import "./index.css";
import { Link } from 'react-router-dom';

function Header({ query, setQuery, setResults, numpokemon, setNumpokemon, isActive, setIsActive, selectedType, setSelectedType, pokemons }) {

  const types = pokemons && Array.isArray(pokemons) 
    ? [...new Set(pokemons.flatMap(pokemon => pokemon.type))].sort()
    : [];

  const handleSearch = () => {
    const foundPokemon = pokemons.find(
      (poke) => poke.name.french.toLowerCase() === query.toLowerCase()
    );

    if (foundPokemon) {
      setNumpokemon(foundPokemon.id - 1); // Afficher le numéro du Pokémon
    } else {
      alert("Aucun Pokémon trouvé");
    }
  };

  const handlePokemonPlus = (numpokemon) => {
    if (numpokemon < pokemons.length - 1) {
      setNumpokemon(numpokemon + 1);
    }
  };

  const handlePokemonMinus = (numpokemon) => {
    if (numpokemon > 0) {
      setNumpokemon(numpokemon - 1);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    console.log(selectedType)
  };

  useEffect(() => {
    let filteredResults = pokemons;
  
    if (query.trim() !== "") {
      filteredResults = filteredResults.filter((poke) =>
        typeof poke.name.french === "string" &&
        poke.name.french.toLowerCase().startsWith(query.toLowerCase())
      );
    }
  
    if (selectedType) {
      filteredResults = filteredResults.filter((poke) =>
        poke.type.includes(selectedType)
      );
    }
  
    setResults(filteredResults);
  }, [query, selectedType]);
  

  return (
    <div className="bouton-container">
      <div className="pokemon-container">
        <button onClick={() => handlePokemonMinus(numpokemon)} className="pokemon-button">
          Pokémon précédent
        </button>

        <button onClick={() => handlePokemonPlus(numpokemon)} className="pokemon-button">
          Pokémon suivant
        </button>
        
        <button
          onClick={() => setIsActive(!isActive)}
        >
          Chromatique
        </button>
      </div>
      
      <Link to="/" className="home-button">
        Accueil
      </Link>

      <div className="search-container">
        <select 
          value={selectedType} 
          onChange={handleTypeChange}
          className="type-select"
        >
          <option value="">Tous les types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <button onClick={handleSearch} className="search-button">
          Sélectionner
        </button>
      </div>
    </div>
  );
}

export default Header;
