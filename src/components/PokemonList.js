import React, { useState, useEffect } from 'react';
import PokemonDataService from '../services/PokemonService';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrievePokemon();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePokemon = () => {
    PokemonDataService.getAll()
      .then((response) => {
        setPokemon(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePokemon();
    setCurrentPokemon(null);
    setCurrentIndex(-1);
  };

  const setActivePokemon = (pokemon, index) => {
    setCurrentPokemon(pokemon);
    setCurrentIndex(index);
  };

  const removeAllPokemon = () => {
    PokemonDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    PokemonDataService.findByName(searchName)
      .then((response) => {
        setPokemon(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Pokemon List</h4>

        <ul className="list-group">
          {pokemon &&
            pokemon.map((pokemon, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActivePokemon(pokemon, index)}
                key={index}
              >
                {pokemon.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPokemon}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPokemon ? (
          <div>
            <h4>Pokemon</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentPokemon.name}
            </div>
            <div>
              <img
                src={currentPokemon.img}
                height="100"
                alt="Imagem do Pokemon"
              />
            </div>
            <div>
              <label>
                <strong>HP:</strong>
              </label>{' '}
              {currentPokemon.hp}
            </div>
            <div>
              <label>
                <strong>Attack:</strong>
              </label>{' '}
              {currentPokemon.attack}
            </div>
            <div>
              <label>
                <strong>Defense:</strong>
              </label>{' '}
              {currentPokemon.defense}
            </div>
            <div>
              <label>
                <strong>Speed:</strong>
              </label>{' '}
              {currentPokemon.speed}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{' '}
              {currentPokemon.active ? 'Ativo' : 'Desativado'}
            </div>

            <Link
              to={'/pokemon/' + currentPokemon.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pokemon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
