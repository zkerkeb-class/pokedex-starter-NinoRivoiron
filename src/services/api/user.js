import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const userApi = {
  getCollection: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/user-cards/collection`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  openBooster: async (token) => {
    try {
      const response = await axios.post(`${API_URL}/user-cards/open-booster`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateCard: async (token, cardId, data) => {
    try {
      const response = await axios.put(`${API_URL}/user-cards/${cardId}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default userApi; 