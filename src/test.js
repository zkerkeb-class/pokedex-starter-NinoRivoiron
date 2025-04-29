import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import pokemonService from './api';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    }))
  }
}));

describe('Pokemon Service', () => {
  let mockAxiosInstance;

  beforeEach(() => {
    // Reset tous les mocks avant chaque test
    vi.clearAllMocks();
    mockAxiosInstance = axios.create();
  });

  describe('getAllPokemons', () => {
    it('devrait récupérer tous les pokemons avec les paramètres par défaut', async () => {
      const mockResponse = {
        data: {
          status: 200,
          total: 2,
          data: [
            { id: 1, name: { english: 'Bulbasaur' } },
            { id: 2, name: { english: 'Ivysaur' } }
          ]
        }
      };

      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await pokemonService.getAllPokemons();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/pokemons', {
        params: {
          name: '',
          type: '',
          page: 1,
          limit: 10
        }
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('devrait récupérer les pokemons avec des filtres personnalisés', async () => {
      const filters = {
        name: 'Pika',
        type: 'electric',
        page: 2,
        limit: 5
      };

      const mockResponse = {
        data: {
          status: 200,
          total: 1,
          data: [{ id: 25, name: { english: 'Pikachu' } }]
        }
      };

      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await pokemonService.getAllPokemons(filters);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/pokemons', {
        params: filters
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getPokemonById', () => {
    it('devrait récupérer un pokemon par son ID', async () => {
      const pokemonId = 25;
      const mockResponse = {
        data: {
          status: 200,
          data: { id: 25, name: { english: 'Pikachu' } }
        }
      };

      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await pokemonService.getPokemonById(pokemonId);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/pokemons/${pokemonId}`);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('createPokemon', () => {
    it('devrait créer un nouveau pokemon', async () => {
      const newPokemon = {
        id: 1000,
        name: { english: 'NewPokemon' },
        type: ['Fire'],
        base: { HP: 100 }
      };

      const mockResponse = {
        data: {
          status: 201,
          message: 'Pokémon ajouté avec succès !',
          data: newPokemon
        }
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await pokemonService.createPokemon(newPokemon);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/pokemons', newPokemon);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('updatePokemon', () => {
    it('devrait mettre à jour un pokemon existant', async () => {
      const pokemonId = 25;
      const updateData = { name: { english: 'UpdatedPokemon' } };

      const mockResponse = {
        data: {
          status: 200,
          data: { id: pokemonId, ...updateData }
        }
      };

      mockAxiosInstance.put.mockResolvedValueOnce(mockResponse);

      const result = await pokemonService.updatePokemon(pokemonId, updateData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(`/pokemons/${pokemonId}`, updateData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('deletePokemon', () => {
    it('devrait supprimer un pokemon', async () => {
      const pokemonId = 25;
      const mockResponse = {
        data: {
          status: 200,
          message: 'Pokémon supprimé avec succès'
        }
      };

      mockAxiosInstance.delete.mockResolvedValueOnce(mockResponse);

      const result = await pokemonService.deletePokemon(pokemonId);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/pokemons/${pokemonId}`);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait gérer les erreurs de l\'API correctement', async () => {
      const errorMessage = 'Pokemon non trouvé';
      mockAxiosInstance.get.mockRejectedValueOnce({
        response: {
          data: { message: errorMessage }
        }
      });

      await expect(pokemonService.getPokemonById(999)).rejects.toThrow(errorMessage);
    });
  });
});