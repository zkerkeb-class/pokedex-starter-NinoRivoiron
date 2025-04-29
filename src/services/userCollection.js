import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getUserCollection = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user-cards/collection`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data || [];
    } catch (error) {
        console.error('Erreur lors de la récupération de la collection:', error);
        return [];
    }
};

export const addToCollection = async (token, pokemonId) => {
    try {
        const response = await axios.post(`${API_URL}/user-cards`, {
            pokemonId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout à la collection:', error);
        throw error;
    }
}; 