import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

// Définition complète des couleurs par type (identique à PokemonCard)
const typeColors = {
    Normal: {
        main: "#A8A878",
        light: "#B8B88F",
        lighter: "#C6C6A7"
    },
    Fighting: {
        main: "#C03028",
        light: "#D04840",
        lighter: "#D67873"
    },
    Flying: {
        main: "#A890F0",
        light: "#B8A5F3",
        lighter: "#C6B7F5"
    },
    Poison: {
        main: "#A040A0",
        light: "#B363B3",
        lighter: "#C183C1"
    },
    Ground: {
        main: "#E0C068",
        light: "#E6CC85",
        lighter: "#EBD69D"
    },
    Rock: {
        main: "#B8A038",
        light: "#C5B05C",
        lighter: "#D1C17D"
    },
    Bug: {
        main: "#A8B820",
        light: "#B9C64A",
        lighter: "#C6D16E"
    },
    Ghost: {
        main: "#705898",
        light: "#8871AB",
        lighter: "#9B83BC"
    },
    Steel: {
        main: "#B8B8D0",
        light: "#C6C6D9",
        lighter: "#D1D1E0"
    },
    Fire: {
        main: "#F08030",
        light: "#F39959",
        lighter: "#F5AC78"
    },
    Water: {
        main: "#6890F0",
        light: "#85A5F3",
        lighter: "#9DB7F5"
    },
    Grass: {
        main: "#78C850",
        light: "#90D070",
        lighter: "#A7DB8D"
    },
    Electric: {
        main: "#D1A408",
        light: "#BB9830",
        lighter: "#EFE0A0"
    },
    Psychic: {
        main: "#F85888",
        light: "#F97AA0",
        lighter: "#FA92B2"
    },
    Ice: {
        main: "#98D8D8",
        light: "#ACDEDE",
        lighter: "#BCE6E6"
    },
    Dragon: {
        main: "#7038F8",
        light: "#8B5BF9",
        lighter: "#A27DFA"
    },
    Dark: {
        main: "#705848",
        light: "#8B776A",
        lighter: "#A29288"
    },
    Fairy: {
        main: "#EE99AC",
        light: "#F1ABB9",
        lighter: "#F4BDC9"
    }
};

// Après la déclaration des couleurs des types, ajoutons une correspondance entre type et numéro d'image
const typeToNumber = {
  Normal: 1,
  Fighting: 2,
  Flying: 3,
  Poison: 4,
  Ground: 5,
  Rock: 6,
  Bug: 7,
  Ghost: 8,
  Steel: 9,
  Fire: 10,
  Water: 11,
  Grass: 12,
  Electric: 13,
  Psychic: 14,
  Ice: 15,
  Dragon: 16,
  Dark: 17,
  Fairy: 18
};

const PokemonCardWithModif = ({ pokemon, isActive, onPrevious, onNext, onToggleChromatique }) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    
    if (!pokemon) {
        return <div className="card">Chargement...</div>;
    }

    const primaryType = pokemon.type[0];
    const colors = typeColors[primaryType] || { main: "#76c7c0", light: "#a8dbd7", lighter: "#cce9e7" };
    
    // Calcul des pourcentages pour les barres de stats
    const Percentage1 = (pokemon.base.HP / 250) * 100;
    const Percentage2 = (pokemon.base.Attack / 134) * 100;
    const Percentage3 = (pokemon.base.Defense / 180) * 100;
    const Percentage4 = (pokemon.base.SpAttack / 154) * 100;
    const Percentage5 = (pokemon.base.SpDefense / 125) * 100;
    const Percentage6 = (pokemon.base.Speed / 150) * 100;

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

    const handleModify = () => {
        navigate(`/edit/${pokemon.id}`);
    };

    const handleDelete = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${pokemon.name.french} ?`)) {
            try {
                setIsDeleting(true);
                await axios.delete(`http://localhost:3000/api/pokemons/${pokemon.id}`);
                alert(`${pokemon.name.french} a été supprimé avec succès !`);
                window.location.reload(); // Recharger la page pour mettre à jour la liste
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Une erreur est survenue lors de la suppression du pokémon.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="pokemon-card-wrapper">
            <div className="card" style={{ 
                borderColor: colors.main,
                backgroundColor: colors.light
            }}>
                <span className="pokemon-name">{pokemon.name.french}</span>
                <div className="pokemon-types">
                    {pokemon.type.map((type, index) => (
                        <img
                            key={index}
                            src={new URL(`../../assets/types/${typeToNumber[type]}.png`, import.meta.url).href}
                            alt={type}
                            className="type-icon"
                        />
                    ))}
                </div>
                <div className="image-container" style={{ 
                    borderColor: colors.main,
                    backgroundColor: colors.lighter
                }}>
                    <img 
                        className="card-image" 
                        src={getImageUrl(pokemon)}
                        alt={pokemon.name.french}
                    />
                </div>
                <div className="pokemon-stats">
                    <div>
                        <span>HP : {pokemon.base.HP} </span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${Percentage1}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <span>Attaque : {pokemon.base.Attack} </span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${Percentage2}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <span>Défense : {pokemon.base.Defense} </span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${Percentage3}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <span>Attaque spéciale : {pokemon.base.SpAttack} </span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${Percentage4}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <span>Défense spéciale : {pokemon.base.SpDefense} </span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${Percentage5}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <span>Vitesse : {pokemon.base.Speed} </span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${Percentage6}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                
                <div className="card-actions">
                    <Link to={`/edit/${pokemon.id}`} className="modify-button">Modifier</Link>
                    <button 
                        className={`delete-button ${pokemon.id <= 151 ? 'disabled' : ''}`}
                        onClick={handleDelete}
                        disabled={pokemon.id <= 151 || isDeleting}
                    >
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </div>
            
            <div className="card-navigation-buttons">
                <button onClick={onPrevious} className="nav-button">Précédent</button>
                <button onClick={onToggleChromatique} className="chroma-button">
                    {isActive ? "Normal" : "Chromatique"}
                </button>
                <button onClick={onNext} className="nav-button">Suivant</button>
            </div>
        </div>
    );
};

export default PokemonCardWithModif; 