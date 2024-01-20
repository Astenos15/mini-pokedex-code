import { useState } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState({
    id: "??",
    name: "N/A",
    height: "??",
    weight: "??",
    sprite: "https://cdn-icons-png.flaticon.com/512/188/188918.png",
    type: "??",
    text: "About Pokemon:",
  });

  async function getPokemon(name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await res.json();

    const res2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );

    const data2 = await res2.json();
    console.log(data2.flavor_text_entries[0].flavor_text);

    setPokemon({
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      sprite: data.sprites.front_default,
      type: data.types[0].type.name,
      text: data2.flavor_text_entries[0].flavor_text,
    });
  }

  function Search() {
    const [search, setSearch] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      if (!search) return;

      getPokemon(search.toLowerCase());
    }

    return (
      <div
        className={`form-container ${
          pokemon.id === "??" ? "search-active" : ""
        }`}
      >
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn">Search</button>
        </form>
      </div>
    );
  }

  function Pokemon() {
    return (
      <div className="pokemon-container">
        <div className="img-box">
          <img className="poke-img" src={pokemon.sprite} alt={pokemon.name} />
        </div>
        <div
          className={`info-container ${pokemon.id === "??" ? "no-search" : ""}`}
        >
          <div className="info-box">
            <h3 className="name ">{pokemon.name}</h3>
            <h4 className="description">Pokedex No:&nbsp; {pokemon.id}</h4>

            <h4 className="description">
              Height:&nbsp; <span className="details">{pokemon.height}</span>
            </h4>
            <h4 className="description">
              Weight: &nbsp;
              <span className="details">{pokemon.weight}</span>
            </h4>
            <h4 className="description">
              Type:&nbsp;{" "}
              <span className="element details">{pokemon.type}</span>
            </h4>
          </div>
          <div className="info-text">
            <p>{pokemon.text}</p>
          </div>
        </div>
        <div>
          <Search />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Pokemon />
    </div>
  );
}
