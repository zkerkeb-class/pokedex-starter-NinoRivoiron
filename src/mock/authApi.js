// Fonction pour simuler l'API d'authentification
let users = JSON.parse(localStorage.getItem('mockUsers') || '[]');

// Sauvegarder les utilisateurs dans localStorage
const saveUsers = () => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

// API simulée
const mockAuthApi = {
  // Inscription
  register: async (userData) => {
    // Vérifier si l'utilisateur existe déjà
    const userExists = users.some(
      user => user.username === userData.username || user.email === userData.email
    );
    
    if (userExists) {
      throw new Error("Cet utilisateur ou cet email existe déjà");
    }
    
    // Créer un nouvel utilisateur
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: userData.password, // Dans un vrai système, ce serait haché
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers();
    
    // Générer un token (simulé)
    const token = `mock-token-${newUser.id}`;
    
    return {
      status: 201,
      message: "Utilisateur créé avec succès",
      token
    };
  },
  
  // Connexion
  login: async (credentials) => {
    // Rechercher l'utilisateur
    const user = users.find(user => user.username === credentials.username);
    
    if (!user || user.password !== credentials.password) {
      throw new Error("Identifiants invalides");
    }
    
    // Générer un token (simulé)
    const token = `mock-token-${user.id}`;
    
    return {
      status: 200,
      message: "Connexion réussie",
      token
    };
  },
  
  // Vérifier le token
  verifyToken: async (token) => {
    // Extraire l'ID de l'utilisateur du token simulé
    const userId = token.replace('mock-token-', '');
    
    // Rechercher l'utilisateur
    const user = users.find(user => user.id === userId);
    
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    
    // Retourner les informations de l'utilisateur sans le mot de passe
    const { password, ...userInfo } = user;
    
    return {
      status: 200,
      data: userInfo
    };
  }
};

export default mockAuthApi; 