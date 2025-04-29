import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { useAuth } from '../context/AuthContext';
import './Collection.css';

const Collection = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

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
        setCollection(sortedCollection);
      } catch (error) {
        console.error('Erreur lors de la récupération de la collection:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [currentUser?.token]);

  if (loading) {
    return <div className="loading-message">Chargement de votre collection...</div>;
  }

  return (
    <div className="collection-container">
      <h1>Ma Collection</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      {collection.length === 0 ? (
        <div className="empty-collection">
          Votre collection est vide. Ouvrez des boosters pour obtenir des cartes !
        </div>
      ) : (
        <div className="cards-grid">
          {collection.map(card => (
            <div key={card.id} className="card-container">
              <PokemonCard 
                pokemon={card}
                showStatus={true}
              />
              {card.quantity > 1 && (
                <div className="card-quantity">
                  x{card.quantity}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection; 