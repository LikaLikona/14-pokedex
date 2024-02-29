const id = new URLSearchParams(window.location.search).get("id");

const split_string = id.split(",");
const sorted = split_string.sort((a, b) => a - b);
console.log(sorted);
console.log(split_string);
const opponent_container = document.getElementById("opponent_container");
const poke_container = document.getElementById("poke_contianer");
const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const main_types = Object.keys(colours);
let pokemon_arr = [];
const fetchPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  pokemon_arr.push(data);
  console.log(pokemon_arr);
  pokemon_arr.sort((a, b) => a.id - b.id);
  console.log(pokemon_arr);
  if (pokemon_arr.length >= 5) {
    pokemon_arr.forEach((pokemon) => {
      createPokemonCard(pokemon);
    });
  }
};
const fetchOpponentPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  createOpponentPokemonCard(data);
};

split_string.forEach((id) => {
  fetchPokemons(id);
});

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) >= 0);
  const id = pokemon.id.toString().padStart(3, "0");
  const color = colours[type];
  pokemonEl.style.backgroundColor = color;
  const prokemonInnerHTML = `
        <div class="img-container">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${pokemon.name}</h3>
        </div>
        `;
  pokemonEl.addEventListener("click", () => {
    window.location.href = `description.html?id=${pokemon.id}`;
  });
  pokemonEl.innerHTML = prokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};
const createOpponentPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) >= 0);
  const id = pokemon.id.toString().padStart(3, "0");
  const color = colours[type];
  pokemonEl.style.backgroundColor = color;
  const prokemonInnerHTML = `
        <div class="img-container">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${pokemon.name}</h3>
        </div>
        `;
  pokemonEl.addEventListener("click", () => {
    window.location.href = `description.html?id=${pokemon.id}`;
  });
  pokemonEl.innerHTML = prokemonInnerHTML;
  opponent_container.appendChild(pokemonEl);
};
// Genereate random 5 numbers of array
const randomArray = (arr) => {
  let result = [];
  for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }

  result.map((id) => {
    fetchOpponentPokemons(id);
  });
  return result;
};
randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);