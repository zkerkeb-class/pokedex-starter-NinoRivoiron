import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // URL de base de l'API
  const API_URL = 'http://localhost:3000/api'; // Avec le préfixe /api
  const AUTH_PATH = '/auth';

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuthStatus(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Fonction pour vérifier le statut d'authentification
  const checkAuthStatus = async (token) => {
    try {
      const response = await axios.get(`${API_URL}${AUTH_PATH}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.data) {
        setCurrentUser({
          ...response.data.data,
          token: token
        });
      }
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion
  const login = async (username, password) => {
    try {
      setError('');
      console.log(`Tentative de connexion à ${API_URL}${AUTH_PATH}/login`);
      
      const response = await axios.post(`${API_URL}${AUTH_PATH}/login`, {
        username, 
        password
      });
      
      console.log('Réponse de connexion:', response.data);
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Récupérer les informations de l'utilisateur avec le token
      const userResponse = await axios.get(`${API_URL}${AUTH_PATH}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (userResponse.data && userResponse.data.data) {
        setCurrentUser({
          ...userResponse.data.data,
          token: token
        });
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError(
        error.response?.data?.message || 
        'Une erreur est survenue lors de la connexion. Vérifiez que le serveur est bien démarré.'
      );
      return false;
    }
  };

  // Fonction d'inscription
  const signup = async (username, email, password) => {
    try {
      setError('');
      console.log(`Tentative d'inscription à ${API_URL}${AUTH_PATH}/register`);
      
      const response = await axios.post(`${API_URL}${AUTH_PATH}/register`, {
        username,
        email,
        password
      });
      
      console.log('Réponse d\'inscription:', response.data);
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      await checkAuthStatus(token);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      
      // Afficher les détails de l'erreur pour le débogage
      if (error.response) {
        console.error("Détails de l'erreur:", error.response.data);
        setError(error.response.data.message || "Erreur du serveur lors de l'inscription");
      } else {
        setError("Une erreur est survenue lors de l'inscription. Vérifiez que le serveur est bien démarré.");
      }
      
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 