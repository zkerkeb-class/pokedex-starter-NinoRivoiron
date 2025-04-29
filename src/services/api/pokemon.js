import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const pokemonApi = {
  getAll: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons`, { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  create: async (pokemonData) => {
    try {
      const response = await axios.post(`${API_URL}/pokemons`, pokemonData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  update: async (id, pokemonData) => {
    try {
      const response = await axios.put(`${API_URL}/pokemons/${id}`, pokemonData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/pokemons/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default pokemonApi; 