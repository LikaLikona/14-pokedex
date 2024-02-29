const poke_container = document.getElementById("poke_contianer");
const startTeam = document.getElementById("startTeam");
startTeam.style.display = "none";
const pokemon_count = 20;

const getPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await fetchPokemons(i);
  }
};
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
const fetchPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};
let prokeArr = [];
const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) >= 0);
  pokemonEl.classList.add(type);
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

  pokemonEl.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Prevent the default context menu

    // Code to remove any existing custom menu goes here

    // Create the custom menu
    const menu = document.createElement("div");
    menu.style.position = "absolute";
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.zIndex = "1000"; // Ensure the menu is above other elements
    menu.innerHTML = `
      <div class="row">
        <div class="btn bten_view">
          <button id="viewDetails">View Details</button>
          </div>
          <div class="btn btn_choose">
          <button id="choosePokemon">Choose Pokemon</button>
          </div>
      </div>
      `;

    document.body.appendChild(menu);

    // Add event listeners for your buttons
    document.getElementById("viewDetails").addEventListener("click", () => {
      window.location.href = `description.html?id=${pokemon.id}`;
      // Remove the menu after selection
      menu.remove();
    });

    document.getElementById("choosePokemon").addEventListener("click", () => {
      // Implement add multiple pokemons functionality

      prokeArr.push(pokemon.id);

      if (prokeArr.length < 5) {
        console.log(prokeArr);
      } else if (prokeArr.length == 5) {
        startTeam.style.display = "block";
        startTeam.addEventListener("click", () => {
          window.location.href = `battle.html?id=${prokeArr}`;
        });
      } else {
        alert("You can choose only 5 pokemons");
      }

      // Remove the menu after selection
      menu.remove();
    });

    // Optional: Remove the menu if the user clicks elsewhere on the page
    document.addEventListener(
      "click",
      (event) => {
        if (!menu.contains(event.target)) {
          menu.remove();
        }
      },
      { once: true },
    );
  });

  pokemonEl.innerHTML = prokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};
getPokemons();
