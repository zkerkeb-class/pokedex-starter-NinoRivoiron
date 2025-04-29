# Pokedex - Collection de Cartes Pokémon

## Description
Ce projet est une application web permettant de gérer une collection de cartes Pokémon. Les utilisateurs peuvent :
- Consulter leur collection de cartes
- Ouvrir des boosters pour obtenir de nouvelles cartes
- Voir les statistiques détaillées de chaque Pokémon
- Gérer les cartes en double

## Fonctionnalités
- **Collection** : Affichage de toutes les cartes possédées avec leurs statistiques
- **Boosters** : Système d'ouverture de boosters avec gestion des cartes nouvelles et dupliquées
- **Cartes Chromatiques** : Support des versions chromatiques (shiny) des Pokémon
- **Statistiques** : Affichage détaillé des statistiques de chaque Pokémon avec barres de progression
- **Types** : Représentation visuelle des types de Pokémon avec leurs couleurs associées

## Technologies Utilisées
- **Frontend** : React.js avec Vite
- **Backend** : Node.js avec Express
- **Base de données** : MongoDB
- **Style** : CSS personnalisé avec animations et transitions
- **API** : API REST pour la gestion des cartes et des utilisateurs

## Installation
1. Cloner le dépôt
```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances du frontend
```bash
cd pokedex-front
npm install
```

3. Installer les dépendances du backend
```bash
cd ../pokedex-api
npm install
```

4. Configurer les variables d'environnement
- Créer un fichier `.env` dans le dossier backend
- Ajouter les variables nécessaires (MongoDB, JWT secret, etc.)

5. Lancer les serveurs
```bash
# Terminal 1 - Backend
cd pokedex-api
npm run dev

# Terminal 2 - Frontend
cd pokedex-front
npm run dev
```

## Structure du Projet
```
pokedex/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PokemonCard/
│   │   │   ├── Booster/
│   │   │   └── Collection/
│   │   ├── services/
│   │   ├── context/
│   │   └── assets/
│   └── public/
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── services/
    └── config/
```

## Fonctionnalités Techniques
- **Authentification** : Système de connexion/inscription sécurisé
- **Gestion des Cartes** : CRUD complet pour les cartes Pokémon
- **Système de Boosters** : Algorithme de distribution aléatoire des cartes
- **Interface Responsive** : Adaptée à tous les écrans
- **Animations** : Transitions fluides et effets visuels


Vidéo :
https://youtu.be/OqbzBI-WR6k