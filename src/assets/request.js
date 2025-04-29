const axios = require('axios').default;

// axios.<méthode> permettra ainsi l’autocomplétion et donnera les types des paramètres

const axios = require('axios');

// Requêter un utilisateur avec un ID donné.
axios.get('http://localhost:3000/api/pokemons/?id=12')
  .then(function (response) {
    // en cas de réussite de la requête
    console.log(response);
  })
  .catch(function (error) {
    // en cas d’échec de la requête
    console.log(error);
  })
  .finally(function () {
    // dans tous les cas
  });

// la requête ci-dessus pourrait aussi être faite comme ceci :
axios.get('http://localhost:3000/api/pokemons/', {
    params: {
      id: 12
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // dans tous les cas
  });  

// vous souhaitez utiliser async/await ?
// ajoutez le mot-clé `async` à la fonction/méthode englobante
async function getUser() {
  try {
    const response = await axios.get('http://localhost:3000/api/pokemons/?id=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}