import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddPokemon from './components/AddPokemon';
import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/pokemon" className="navbar-brand">
            Aplicativo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/pokemon'} className="nav-link">
                Pokemons
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/add'} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/pokemon']} component={PokemonList} />
            <Route exact path="/add" component={AddPokemon} />
            <Route path="/pokemon/:id" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;