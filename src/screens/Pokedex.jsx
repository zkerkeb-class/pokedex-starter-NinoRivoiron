import React from 'react';
import { Link } from 'react-router-dom';

function Pokedex() {
  return (
    <div>
      <h1>Pokédex</h1>
      <p>Cette page est en cours de développement</p>
      <Link to="/collection">Retour à la collection</Link>
    </div>
  );
}

export default Pokedex; 