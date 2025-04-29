export const handleApiError = (error) => {
  if (error.response) {
    // Erreur de l'API
    const { status, data } = error.response;
    switch (status) {
      case 401:
        return "Vous devez être connecté pour effectuer cette action";
      case 403:
        return "Vous n'avez pas les droits pour effectuer cette action";
      case 404:
        return "La ressource demandée n'existe pas";
      case 409:
        return "Un conflit est survenu";
      default:
        return data.message || "Une erreur est survenue";
    }
  } else if (error.request) {
    // Erreur de réseau
    return "Impossible de se connecter au serveur";
  } else {
    // Erreur de configuration
    return "Une erreur est survenue lors de la configuration de la requête";
  }
};

export const handleValidationError = (errors) => {
  return Object.values(errors).join(', ');
}; 