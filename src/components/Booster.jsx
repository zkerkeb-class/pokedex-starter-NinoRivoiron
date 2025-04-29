import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { useAuth } from '../context/AuthContext';
import './Booster.css';

const Booster = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCollection, setUserCollection] = useState([]);
  const { currentUser } = useAuth();

  // Récupérer la collection de l'utilisateur
  useEffect(() => {
    const fetchCollection = async () => {
      if (!currentUser?.token) return;

      try {
        const response = await fetch('http://localhost:3000/api/user-cards/collection', {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de la collection');
        }

        const data = await response.json();
        // Trier la collection par ID de Pokémon
        const sortedCollection = data.data.sort((a, b) => a.id - b.id);
        setUserCollection(sortedCollection);
      } catch (error) {
        console.error('Erreur lors de la récupération de la collection:', error);
      }
    };

    fetchCollection();
  }, [currentUser?.token]);

  const openBooster = async () => {
    try {
      setLoading(true);
      setError('');

      if (!currentUser?.token) {
        throw new Error('Vous devez être connecté pour ouvrir un booster');
      }

      const response = await fetch('http://localhost:3000/api/user-cards/open-booster', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ouverture du booster');
      }

      const data = await response.json();
      // Trier les cartes par ID
      const sortedCards = data.cards.sort((a, b) => a.id - b.id);
      setCards(sortedCards);
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du booster:', error);
      setError(error.message || 'Une erreur est survenue lors de l\'ouverture du booster');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booster-container">
      <h1>Ouvrir un booster</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={openBooster}
        disabled={loading}
        className="open-booster-button"
      >
        {loading ? 'Ouverture en cours...' : 'Ouvrir un booster'}
      </button>
      
      <div className="cards-grid">
        {cards.map(card => (
          <div key={card.id} className="card-container">
            <PokemonCard 
              pokemon={card}
              showStatus={true}
            />
            <div className={`card-status ${card.status}`}>
              {card.status === 'nouveau' ? 'Nouveau' : 'Dupliqué'}
            </div>
            {card.quantity > 1 && (
              <div className="card-quantity">
                x{card.quantity}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booster; 