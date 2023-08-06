const pokeConteiner = document.querySelector(".poke-conteiner");
const pokemonCount = 151;

const colors = {
  fire: "#fd7d24",
  grass: "#9bcc50",
  electric: "#ebd334",
  water: "#4592c4",
  ground: "#ab9842",
  rock: "#a38c21",
  fairy: "#fbbceb",
  poison: "#b97fc9",
  bug: "#729f3f",
  dragon: "#f16e57",
  psychic: "#f366b9",
  flying: "#3dc7ef",
  fighting: "#d56723",
  normal: "#a4acaf",
  steel: "#9eb7b8",
  ice: "#58c4e4",
  ghost: "#7b62a3",
};
const mainTypes = Object.keys(colors);

let allPokemonsData = [];

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    const data = await getPokemons(i);
    allPokemonsData.push(data);
  }
};

const displayRandomPokemon = () => {
  pokeConteiner.innerHTML = "";
  const randomPokemon = getRandomPokemon();
  createPokemonCard(randomPokemon);
};

const getRandomPokemon = () => {
  const randomIndex = Math.floor(Math.random() * allPokemonsData.length);
  const randomPokemon = allPokemonsData[randomIndex];
  return randomPokemon;
};

const randomButton = document.getElementById("randomButton");
randomButton.addEventListener("click", displayRandomPokemon);

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  createPokemonCard(data);
  return data;
};

const createPokemonCard = (poke) => {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, "0");

  const pokeTypes = poke.types.map((type) => type.type.name);

  const typeColors = pokeTypes.map((type) => {
    const color = colors[type];
    return `<span class="type" style="background-color:${color}">${type}</span>`;
  });

  const pokemonInnerHTML = `
        <div class="img-conteiner">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              poke.id
            }.png">
        </div>
        <div class="info">
            <span class="number">Nº ${id}</span>
            <h1 class="name">${name}</h1>
            <div class="types">
                ${typeColors.join(" ")}
            </div>
        </div>
    `;

  card.innerHTML = pokemonInnerHTML;
  card.setAttribute("data-id", poke.id);
  card.addEventListener("click", () => openPokemonDetails(poke.id));

  pokeConteiner.appendChild(card);
};

const openPokemonDetails = (pokemonId) => {
  const url = `details.html?id=${pokemonId}`;
  window.location.href = url;
};

const searchPokemon = (query) => {
  pokeConteiner.innerHTML = "";

  const filteredPokemons = allPokemonsData.filter((pokemon) => {
    return pokemon.name.includes(query.toLowerCase());
  });

  filteredPokemons.forEach((pokemon) => {
    createPokemonCard(pokemon);
  });
};
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  searchPokemon(query);
});

fetchPokemons();
