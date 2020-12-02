import React, { useState } from 'react';
import PokemonDataService from '../services/PokemonService';

const AddPokemon = () => {
  const initialPokemonState = {
    _id: null,
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    active: true,
  };
  const [pokemon, setPokemon] = useState(initialPokemonState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPokemon({ ...pokemon, [name]: value });
  };

  const savePokemon = () => {
    const {name, img, hp, attack, defense,speed} = pokemon
    let data = {
      name,
      img,
      hp,
      attack,
      defense,
      speed,
    };

    PokemonDataService.create(data)
    .then((response) => {
      const {id,name, img, hp, attack, defense,speed,active} = response.data
        setPokemon({
          id,
          name,
          img,
          hp,
          attack,
          defense,
          speed,
          active,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPokemon = () => {
    setPokemon(initialPokemonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPokemon}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={pokemon.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="img">Imagem</label>
            <input
              type="text"
              className="form-control"
              id="img"
              required
              value={pokemon.img}
              onChange={handleInputChange}
              name="img"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hp">HP</label>
            <input
              type="text"
              className="form-control"
              id="hp"
              required
              value={pokemon.hp}
              onChange={handleInputChange}
              name="hp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="attack">Ataque</label>
            <input
              type="text"
              className="form-control"
              id="attack"
              required
              value={pokemon.attack}
              onChange={handleInputChange}
              name="attack"
            />
          </div>
          <div className="form-group">
            <label htmlFor="defense">Defesa</label>
            <input
              type="text"
              className="form-control"
              id="defense"
              required
              value={pokemon.defense}
              onChange={handleInputChange}
              name="defense"
            />
          </div>
          <div className="form-group">
            <label htmlFor="speed">Velocidade</label>
            <input
              type="text"
              className="form-control"
              id="speed"
              required
              value={pokemon.speed}
              onChange={handleInputChange}
              name="speed"
            />
          </div>
          <button onClick={savePokemon} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPokemon;
