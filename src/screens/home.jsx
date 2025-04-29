import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Header from '../components/header';
import PokemonCard from '../components/PokemonCard';
import Pokedex from '../components/Pokedex';
import axios from 'axios';
import PokemonCardWithModif from '../components/PokemonCardWithModif';

const API_URL = 'http://localhost:3000/api';

function Home() {
  const [numpokemon, setNumpokemon] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllPokemon = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/pokemons`);
      console.log('Response data:', response.data);
      
      if (Array.isArray(response.data)) {
      setPokemons(response.data);
      setResults(response.data);
      } 
      else if (response.data && Array.isArray(response.data.data)) {
        setPokemons(response.data.data);
        setResults(response.data.data);
      }
      else {
        console.error('Format de données inattendu:', response.data);
        setPokemons([]);
        setResults([]);
      }
    } catch (error) {
      console.error('Erreur:', error.message);
      setPokemons([]);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (numpokemon > 0) {
      setNumpokemon(numpokemon - 1);
    }
  };

  const handleNext = () => {
    if (numpokemon < pokemons.length - 1) {
      setNumpokemon(numpokemon + 1);
    }
  };

  const toggleChromatique = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!pokemons || pokemons.length === 0) {
    return <div>Aucun pokémon trouvé</div>;
  }

  return (
    <div className="home-container">
      <div className="search-filters-row">
        <Header 
          query={query} 
          setQuery={setQuery} 
          setResults={setResults} 
          numpokemon={numpokemon} 
          setNumpokemon={setNumpokemon} 
          isActive={isActive} 
          setIsActive={setIsActive} 
          selectedType={selectedType} 
          setSelectedType={setSelectedType}
          pokemons={pokemons}
        />
      </div>
      
      <div className='style-page'>
        <div className='pokemon-body'>
          <div className="pokemon-card-section">
            <PokemonCardWithModif 
              pokemon={pokemons[numpokemon]} 
              isActive={isActive}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onToggleChromatique={toggleChromatique}
            />
          </div>
          <div className="pokedex-section">
            <Pokedex 
              setNumpokemon={setNumpokemon} 
              query={query} 
              setQuery={setQuery} 
              setResults={setResults} 
              isActive={isActive} 
              selectedType={selectedType}
              pokemons={pokemons}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
