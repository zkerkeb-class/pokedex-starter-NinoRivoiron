import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CreateCard.css'; // Réutiliser les styles de création

function EditPokemon() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  // Valeurs maximales pour chaque stat
  const maxStats = {
    hp: 250,
    attack: 134,
    defense: 180,
    spAttack: 154,
    spDefense: 125,
    speed: 150
  };

  // Récupérer les données du Pokémon à éditer
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
        
        // Récupérer les données du Pokémon
        let pokemonData;
        
        // Vérifier les différentes structures possibles de la réponse
        if (response.data && response.data.data) {
          // Si les données sont dans response.data.data
          pokemonData = response.data.data;
        } else if (response.data) {
          // Si les données sont directement dans response.data
          pokemonData = response.data;
        }
        
        // Vérifier que nous avons bien récupéré des données
        if (!pokemonData || !pokemonData.base) {
          throw new Error("Format de données invalide");
        }
        
        console.log("Données du Pokémon récupérées:", pokemonData);
        
        setPokemon(pokemonData);
        
        // Déterminer les valeurs des stats spéciales selon la structure
        const spAttack = 
          (pokemonData.base && pokemonData.base["Sp. Attack"] !== undefined) ? pokemonData.base["Sp. Attack"] :
          (pokemonData.base && pokemonData.base.SpAttack !== undefined) ? pokemonData.base.SpAttack :
          (pokemonData.base && pokemonData.base.Sp && pokemonData.base.Sp.Attack !== undefined) ? pokemonData.base.Sp.Attack :
          (pokemonData.Sp && pokemonData.Sp.Attack !== undefined) ? pokemonData.Sp.Attack :
          (pokemonData.Sp && pokemonData.Sp[' Attack'] !== undefined) ? pokemonData.Sp[' Attack'] : 0;
        
        const spDefense = 
          (pokemonData.base && pokemonData.base["Sp. Defense"] !== undefined) ? pokemonData.base["Sp. Defense"] :
          (pokemonData.base && pokemonData.base.SpDefense !== undefined) ? pokemonData.base.SpDefense :
          (pokemonData.base && pokemonData.base.Sp && pokemonData.base.Sp.Defense !== undefined) ? pokemonData.base.Sp.Defense :
          (pokemonData.Sp && pokemonData.Sp.Defense !== undefined) ? pokemonData.Sp.Defense :
          (pokemonData.Sp && pokemonData.Sp[' Defense'] !== undefined) ? pokemonData.Sp[' Defense'] : 0;
        
        // Initialiser le formulaire avec les données du Pokémon
        setFormData({
          name: pokemonData.name.french || "",
          type1: pokemonData.type && pokemonData.type[0] ? pokemonData.type[0] : "",
          type2: pokemonData.type && pokemonData.type[1] ? pokemonData.type[1] : "",
          hp: pokemonData.base.HP ? pokemonData.base.HP.toString() : "0",
          attack: pokemonData.base.Attack ? pokemonData.base.Attack.toString() : "0",
          defense: pokemonData.base.Defense ? pokemonData.base.Defense.toString() : "0",
          spAttack: spAttack.toString(),
          spDefense: spDefense.toString(),
          speed: pokemonData.base.Speed ? pokemonData.base.Speed.toString() : "0"
        });
      } catch (error) {
        console.error('Erreur lors de la récupération du Pokémon:', error);
        setError('Impossible de récupérer les données du Pokémon. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

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
      const types = [formData.type1];
      if (formData.type2) types.push(formData.type2);

      const updateData = {
        id: parseInt(id),
        name: {
          french: formData.name,
          english: formData.name,
          japanese: pokemon.name.japanese || formData.name,
          chinese: pokemon.name.chinese || formData.name
        },
        type: types,
        base: {
          HP: parseInt(formData.hp),
          Attack: parseInt(formData.attack),
          Defense: parseInt(formData.defense),
          SpAttack: parseInt(formData.spAttack),
          SpDefense: parseInt(formData.spDefense),
          Speed: parseInt(formData.speed)
        }
      };

      if (pokemon.image) updateData.image = pokemon.image;

      await axios.put(`http://localhost:3000/api/pokemons/${id}`, updateData);
      alert('Pokémon modifié avec succès!');
      navigate('/collection');
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
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
          <h1>Modifier le Pokémon</h1>
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
        <h1>Modifier {pokemon?.name.french}</h1>
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
            {isSubmitting ? 'Modification en cours...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPokemon; 