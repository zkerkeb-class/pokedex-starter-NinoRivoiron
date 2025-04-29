import React, { useState, useEffect } from 'react';
import PokemonCard from '../PokemonCard';
import { useAuth } from '../../context/AuthContext';
import pokemonApi from '../../services/api/pokemon';
import { getUserCollection, addToCollection } from '../../services/userCollection';
import './style.css';

const Booster = () => {
    const [pokemons, setPokemons] = useState([]);
    const [boosterCards, setBoosterCards] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPokemons = await pokemonApi.getAll();
                setPokemons(allPokemons.data || []);
            
                if (currentUser?.token) {
                    const collection = await getUserCollection(currentUser.token);
                    setUserCollection(collection);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };
        fetchData();
    }, [currentUser]);

    const openBooster = async () => {
        try {
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
                throw new Error('Erreur lors de l\'ouverture du booster');
            }

            const data = await response.json();
            setBoosterCards(data.cards);

            // Mettre à jour la collection
            const updatedCollection = await getUserCollection(currentUser.token);
            setUserCollection(updatedCollection);
        } catch (error) {
            console.error('Erreur lors de l\'ouverture du booster:', error);
        }
    };

    return (
        <div className="booster-container">
            <h2>Booster de Cartes Pokémon</h2>
            <button onClick={openBooster} className="open-booster-btn">
                Ouvrir un Booster
            </button>
            
            <div className="booster-cards">
                {boosterCards.map((card, index) => (
                    <div key={index} className="booster-card">
                        <PokemonCard pokemon={card} isActive={false} />
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