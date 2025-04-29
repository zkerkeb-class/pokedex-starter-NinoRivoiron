import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler utility function
const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue';
  throw new Error(errorMessage);
};

export const pokemonService = {
  // Get all pokemons with optional filters and pagination
  async getAllPokemons({ name = '', type = '', page = 1, limit = 10 } = {}) {
    try {
      const response = await apiClient.get('/pokemons', {
        params: {
          name,
          type,
          page,
          limit
        }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get a specific pokemon by ID
  async getPokemonById(id) {
    try {
      const response = await apiClient.get(`/pokemons/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create a new pokemon
  async createPokemon(pokemonData) {
    try {
      const response = await apiClient.post('/pokemons', pokemonData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update an existing pokemon
  async updatePokemon(id, pokemonData) {
    try {
      const response = await apiClient.put(`/pokemons/${id}`, pokemonData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete a pokemon
  async deletePokemon(id) {
    try {
      const response = await apiClient.delete(`/pokemons/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

export default pokemonService;