import './index.css';
import { useState, useEffect } from 'react';

function Pokedex({ setNumpokemon, query, setQuery, setResults, isActive, selectedType, pokemons }) {
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        // Vérifier que pokemons est bien un tableau
        if (!Array.isArray(pokemons)) {
            console.error('pokemons n\'est pas un tableau:', pokemons);
            setFilteredPokemons([]);
            return;
        }

        // Si c'est un tableau, on continue
        let filtered = [...pokemons];

        // Trie les pokémons par ID
        filtered.sort((a, b) => a.id - b.id);

        // Applique les filtres
        if (query) {
            filtered = filtered.filter(pokemon =>
                pokemon.name?.french && pokemon.name.french.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (selectedType) {
            filtered = filtered.filter(pokemon =>
                pokemon.type && pokemon.type.includes(selectedType)
            );
        }

        setFilteredPokemons(filtered);
    }, [query, selectedType, pokemons]);

    const getImageUrl = (pokemon) => {
        try {
            // Si l'ID est supérieur à 151, utiliser l'image 152.png
            if (pokemon.id > 151) {
                if (isActive) {
                    return new URL(`../../assets/pokemons/shiny/152.png`, import.meta.url).href;
                }
                return new URL(`../../assets/pokemons/152.png`, import.meta.url).href;
            }
            
            // Sinon, utiliser l'image correspondant à l'ID
            if (isActive) {
                return new URL(`../../assets/pokemons/shiny/${pokemon.id}.png`, import.meta.url).href;
            }
            return new URL(`../../assets/pokemons/${pokemon.id}.png`, import.meta.url).href;
        } catch (error) {
            console.error('Erreur de chargement d\'image:', error);
            return null;
        }
    };
    
    return (
        <div className='pokedex-container'>
            {Array.isArray(filteredPokemons) && filteredPokemons.map((pokemon) => {
                if (!pokemon || !pokemon.name) return null;

                const imageUrl = getImageUrl(pokemon);

                return (
                    <button 
                        key={pokemon._id}
                        onClick={() => setNumpokemon(pokemon.id - 1)}
                        className='pokemon-bouton'
                    >
                        <span>
                            <img 
                                className='pokemon-image' 
                                src={imageUrl}
                                alt={pokemon.name.french || 'Pokemon'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    try {
                                        e.target.src = new URL('../../assets/pokemons/0.png', import.meta.url).href;
                                    } catch (error) {
                                        console.error('Erreur image par défaut:', error);
                                    }
                                }}
                            />
                            <div>{pokemon.name.french || 'Pokemon inconnu'}</div>
                        </span>
                </button>
                );
            })}
        </div>
    );
}

export default Pokedex;