import React, { useState, useEffect } from "react";
import PokemonDataService from "../services/PokemonService";

const Pokemon = (props) => {
  const initialPokemonState = {
    _id: null,
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    active: true,
  };
  const [currentPokemon, setCurrentPokemon] = useState(initialPokemonState);
  const [message, setMessage] = useState("");

  const getPokemon = (id) => {
    PokemonDataService.get(id)
      .then((response) => {
        setCurrentPokemon(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPokemon(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentPokemon({ ...currentPokemon, [name]: value });
  };

  const updateActive = (status) => {
    const { _id, name, img, hp, attack, defense, speed } = currentPokemon;
    var data = {
      _id,
      name,
      img,
      hp,
      attack,
      defense,
      speed,

      active: status,
    };
    PokemonDataService.update(currentPokemon.id, data)
      .then((response) => {
        setCurrentPokemon({ ...currentPokemon, active: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePokemon = () => {
    PokemonDataService.update(currentPokemon.id, currentPokemon)
      .then((response) => {
        console.log(response.data);
        setMessage("The pokemon was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePokemon = () => {
    PokemonDataService.remove(currentPokemon.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/pokemon");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPokemon ? (
        <div className="edit-form">
          <h4>Pokemon</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentPokemon.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Image</label>
              <input
                type="text"
                className="form-control"
                id="img"
                name="img"
                value={currentPokemon.img}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hp">HP</label>
              <input
                type="number"
                className="form-control"
                id="hp"
                name="hp"
                value={currentPokemon.hp}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="attack">Attack</label>
              <input
                type="number"
                className="form-control"
                id="attack"
                name="attack"
                value={currentPokemon.attack}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="defense">Defense</label>
              <input
                type="number"
                className="form-control"
                id="defense"
                name="defense"
                value={currentPokemon.defense}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="speed">Speed</label>
              <input
                type="number"
                className="form-control"
                id="speed"
                name="speed"
                value={currentPokemon.speed}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPokemon.active ? "Ativo" : "Desativado"}
            </div>
          </form>

          {currentPokemon.active ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateActive(false)}
            >
              Desativar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateActive(true)}
            >
              Ativar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePokemon}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePokemon}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Pokemon...</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
