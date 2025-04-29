import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateCard.css';

function CreateCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type1: '',
    type2: '',
    hp: '',
    attack: '',
    defense: '',
    spAttack: '',
    spDefense: '',
    speed: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [nextId, setNextId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Valeurs maximales pour chaque stat
  const maxStats = {
    hp: 250,
    attack: 134,
    defense: 180,
    spAttack: 154,
    spDefense: 125,
    speed: 150
  };

  // Récupérer le prochain ID disponible
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3000/api/pokemons');
        
        // S'assurer que les données sont au bon format
        let pokemonData = response.data;
        
        // Si les données sont dans un objet contenant une propriété 'data', ajustez
        if (response.data && response.data.data) {
          pokemonData = response.data.data;
        }
        
        // Trouver l'ID le plus élevé
        let maxId = 0;
        if (pokemonData && pokemonData.length > 0) {
          // Parcourir tous les Pokémon pour trouver le plus grand ID
          pokemonData.forEach(pokemon => {
            if (pokemon.id && typeof pokemon.id === 'number' && pokemon.id > maxId) {
              maxId = pokemon.id;
            }
          });
        }
        
        // Incrémenter pour obtenir le prochain ID
        const nextAvailableId = maxId + 1;
        setNextId(nextAvailableId);
        console.log('Prochain ID disponible:', nextAvailableId);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon:', error);
        setError('Impossible de déterminer le prochain ID. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNextId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Pour les stats numériques, assurer que la valeur est entre 0 et le max défini
    if (['hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'].includes(name)) {
      const numValue = parseInt(value) || 0;
      if (numValue < 0) return; // Ignorer les valeurs négatives
      if (numValue > maxStats[name]) return; // Ignorer les valeurs au-dessus du max
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Vérifier que tous les champs sont renseignés
      if (!formData.name || !formData.type1 || !formData.hp || !formData.attack || 
          !formData.defense || !formData.spAttack || !formData.spDefense || !formData.speed) {
        setError('Tous les champs sont obligatoires.');
        setIsSubmitting(false);
        return;
      }

      // Créer un tableau des types
      let types = [formData.type1];
      if (formData.type2 && formData.type2 !== "") {
        types.push(formData.type2);
      }

      // Utiliser fetch au lieu d'axios
      const response = await fetch('http://localhost:3000/api/pokemons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: nextId,
          name: {
            french: formData.name,
            english: formData.name,
            japanese: formData.name,
            chinese: formData.name
          },
          type: types,
          base: {
            HP: parseInt(formData.hp),
            Attack: parseInt(formData.attack),
            Defense: parseInt(formData.defense),
            Speed: parseInt(formData.speed),
            SpAttack: parseInt(formData.spAttack),
            SpDefense: parseInt(formData.spDefense)
          },
          image: "/src/assets/pokemons/152.png"
        })
      });

      // Vérifier si la réponse est OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du pokémon');
      }

      const data = await response.json();
      
      alert('Pokémon créé avec succès!');
      navigate('/collection');
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la création du pokémon. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeOptions = [
    'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
    'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'
  ];

  // Afficher un message de chargement si nécessaire
  if (isLoading) {
    return (
      <div className="create-card-page">
        <header className="create-card-header">
          <h1>Créer un Pokémon</h1>
        </header>
        <div className="create-card-container">
          <div className="loading-message">Chargement en cours...</div>
        </div>
      </div>
    );
  }

  // Afficher le formulaire complet une fois les données chargées
  return (
    <div className="create-card-page">
      <header className="create-card-header">
        <h1>Créer un Pokémon</h1>
      </header>

      <div className="create-card-container">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom du Pokémon</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type1">Type principal</label>
              <select
                id="type1"
                name="type1"
                value={formData.type1}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un type</option>
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type2">Type secondaire</label>
              <select
                id="type2"
                name="type2"
                value={formData.type2}
                onChange={handleChange}
              >
                <option value="">Aucun</option>
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <h2>Statistiques</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hp">
                HP <span className="stat-max">(max {maxStats.hp})</span>
              </label>
              <input
                type="number"
                id="hp"
                name="hp"
                value={formData.hp}
                onChange={handleChange}
                min="1"
                max={maxStats.hp}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="attack">
                Attaque <span className="stat-max">(max {maxStats.attack})</span>
              </label>
              <input
                type="number"
                id="attack"
                name="attack"
                value={formData.attack}
                onChange={handleChange}
                min="1"
                max={maxStats.attack}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="defense">
                Défense <span className="stat-max">(max {maxStats.defense})</span>
              </label>
              <input
                type="number"
                id="defense"
                name="defense"
                value={formData.defense}
                onChange={handleChange}
                min="1"
                max={maxStats.defense}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="spAttack">
                Attaque spéciale <span className="stat-max">(max {maxStats.spAttack})</span>
              </label>
              <input
                type="number"
                id="spAttack"
                name="spAttack"
                value={formData.spAttack}
                onChange={handleChange}
                min="1"
                max={maxStats.spAttack}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="spDefense">
                Défense spéciale <span className="stat-max">(max {maxStats.spDefense})</span>
              </label>
              <input
                type="number"
                id="spDefense"
                name="spDefense"
                value={formData.spDefense}
                onChange={handleChange}
                min="1"
                max={maxStats.spDefense}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="speed">
                Vitesse <span className="stat-max">(max {maxStats.speed})</span>
              </label>
              <input
                type="number"
                id="speed"
                name="speed"
                value={formData.speed}
                onChange={handleChange}
                min="1"
                max={maxStats.speed}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création en cours...' : 'Créer la carte'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCard; 