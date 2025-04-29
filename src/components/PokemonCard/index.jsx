import './index.css';

/**
 * Définition des couleurs pour chaque type de Pokémon
 * Chaque type a trois nuances : main (principale), light (claire) et lighter (plus claire)
 */
const typeColors = {
    Normal: { main: "#A8A878", light: "#B8B88F", lighter: "#C6C6A7" },
    Fighting: { main: "#F08030", light: "#F39959", lighter: "#F5AC78" },
    Flying: { main: "#A890F0", light: "#B8A5F3", lighter: "#C6B7F5" },
    Poison: { main: "#A040A0", light: "#B363B3", lighter: "#C183C1" },
    Ground: { main: "#E0C068", light: "#E6CC85", lighter: "#EBD69D" },
    Rock: { main: "#B8A038", light: "#C5B05C", lighter: "#D1C17D" },
    Bug: { main: "#A8B820", light: "#B9C64A", lighter: "#C6D16E" },
    Ghost: { main: "#705898", light: "#8871AB", lighter: "#9B83BC" },
    Steel: { main: "#B8B8D0", light: "#C6C6D9", lighter: "#D1D1E0" },
    Fire: { main: "#C03028", light: "#D04840", lighter: "#D67873" },
    Water: { main: "#6890F0", light: "#85A5F3", lighter: "#9DB7F5" },
    Grass: { main: "#78C850", light: "#90D070", lighter: "#A7DB8D" },
    Electric: { main: "#F8D030", light: "#F9D959", lighter: "#FAE078" },
    Psychic: { main: "#F85888", light: "#F97AA0", lighter: "#FA92B2" },
    Ice: { main: "#98D8D8", light: "#ACDEDE", lighter: "#BCE6E6" },
    Dragon: { main: "#7038F8", light: "#8B5BF9", lighter: "#A27DFA" },
    Dark: { main: "#705848", light: "#8B776A", lighter: "#A29288" },
    Fairy: { main: "#EE99AC", light: "#F1ABB9", lighter: "#F4BDC9" }
};

/**
 * Correspondance entre les types de Pokémon et leurs numéros d'image
 */
const typeToNumber = {
    Normal: "1", Fighting: "2", Flying: "3", Poison: "4", Ground: "5",
    Rock: "6", Bug: "7", Ghost: "8", Steel: "9", Fire: "10",
    Water: "11", Grass: "12", Electric: "13", Psychic: "14", Ice: "15",
    Dragon: "16", Dark: "17", Fairy: "18"
};

/**
 * Composant PokemonCard qui affiche les informations d'un Pokémon
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.pokemon - Les données du Pokémon
 * @param {boolean} props.isActive - Indique si le Pokémon est actif (pour l'affichage chromatique)
 */
const PokemonCard = ({ pokemon, isActive }) => {
    // Vérification des données requises
    if (!pokemon || !pokemon.type || !pokemon.type[0]) {
        return <div className="card">Chargement...</div>;
    }

    // Récupération des couleurs selon le type principal
    const primaryType = pokemon.type[0];
    const colors = typeColors[primaryType] || { main: "#76c7c0", light: "#a8dbd7", lighter: "#cce9e7" };
    
    // Calcul des pourcentages pour les barres de statistiques
    const statsPercentages = {
        HP: (pokemon.base.HP / 250) * 100,
        Attack: (pokemon.base.Attack / 134) * 100,
        Defense: (pokemon.base.Defense / 180) * 100,
        SpAttack: (pokemon.base.SpAttack / 154) * 100,
        SpDefense: (pokemon.base.SpDefense / 125) * 100,
        Speed: (pokemon.base.Speed / 150) * 100
    };

    /**
     * Génère l'URL de l'image du Pokémon
     * @param {Object} pokemon - Les données du Pokémon
     * @returns {string} L'URL de l'image
     */
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

    /**
     * Gère l'erreur de chargement d'image
     */
    const handleImageError = (e) => {
        e.target.onerror = null;
        try {
            e.target.src = new URL('../../assets/pokemons/0.png', import.meta.url).href;
        } catch (error) {
            console.error('Erreur image par défaut:', error);
        }
    };

    return (
        <div className="card" style={{ 
            borderColor: colors.main,
            backgroundColor: colors.light
        }}>
            {/* En-tête de la carte */}
            <span className="pokemon-name">{pokemon.name.french}</span>
            
            {/* Types du Pokémon */}
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

            {/* Image du Pokémon */}
            <div className="image-container" style={{ 
                borderColor: colors.main,
                backgroundColor: colors.lighter
            }}>
                <img 
                    className="card-image" 
                    src={getImageUrl(pokemon)}
                    alt={pokemon.name.french}
                    onError={handleImageError}
                />
            </div>

            {/* Statistiques du Pokémon */}
            <div className="pokemon-stats">
                {Object.entries({
                    HP: pokemon.base.HP,
                    Attack: pokemon.base.Attack,
                    Defense: pokemon.base.Defense,
                    SpAttack: pokemon.base.SpAttack,
                    SpDefense: pokemon.base.SpDefense,
                    Speed: pokemon.base.Speed
                }).map(([stat, value]) => (
                    <div key={stat}>
                        <span>{stat} : {value}</span>
                        <div className="bar" style={{ backgroundColor: colors.lighter }}>
                            <div
                                className="bar-filled"
                                style={{
                                    width: `${statsPercentages[stat]}%`,
                                    backgroundColor: colors.main
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;
