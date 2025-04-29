import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/home';
import CreateCard from './screens/CreateCard';
import EditPokemon from './screens/EditPokemon';
import Login from './screens/Login';
import Signup from './screens/Signup';
import LandingPage from './screens/LandingPage';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Collection from './components/Collection';
import Booster from './components/Booster/index';
// import Collection from './screens/Collection';
// import Pokedex from './screens/Pokedex';

function App() {
  return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/collection" element={<Home />} />
                    <Route path="/create" element={<CreateCard />} />
                    <Route path="/edit/:id" element={<EditPokemon />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/booster" element={<Booster />} />
                    <Route path="/my-cards" element={<Collection />} />
                    {/* Commentez ou retirez cette route puisque le composant n'existe pas */}
                    {/* <Route path="/pokedex" element={<Pokedex />} /> */}
                    <Route path="/pokedex" element={<Navigate to="/collection" />} />
                </Routes>
            </Router>
        </AuthProvider>
  );
}

export default App;