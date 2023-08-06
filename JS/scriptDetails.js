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

const weaknesses = {
  fire: ["Water", "Electric", "Rock"],
  grass: ["Fire", "Ice", "Poison", "Flying", "Bug"],
  electric: ["Ground"],
  water: ["Electric", "Grass"],
  ground: ["Water", "Grass", "Ice"],
  rock: ["Water", "Grass", "Fighting", "Ground", "Steel"],
  fairy: ["Poison", "Steel"],
  poison: ["Ground", "Psychic"],
  bug: ["Flying", "Rock", "Fire"],
  dragon: ["Ice", "Dragon", "Fairy"],
  psychic: ["Bug", "Ghost", "Dark"],
  flying: ["Electric", "Ice", "Rock"],
  fighting: ["Flying", "Psychic", "Fairy"],
  normal: ["Fighting"],
  steel: ["Fire", "Fighting", "Ground"],
  ice: ["Fire", "Fighting", "Rock", "Steel"],
  ghost: ["Ghost", "Dark"],
};

const getQueryParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

const fetchPokemonDetails = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPokemonDetails(data))
    .catch((error) => console.error(error));
};

const displayPokemonDetails = (pokemon) => {
  const nameElement = document.querySelector(".name");
  const numberElement = document.querySelector(".number");
  const typesElement = document.querySelector(".types");
  const imgElement = document.querySelector(".img");
  const statusElements = document.querySelectorAll(".status-txt li");
  const weaknessesElement = document.querySelector(".weaknesses");
  const pokemonWeaknesses = weaknesses[pokemon.types[0].type.name.toLowerCase()];

  nameElement.textContent = pokemon.name.toUpperCase();
  numberElement.textContent = `Nº ${pokemon.id.toString().padStart(3, "0")}`;

  const animatedGifSprite =
    pokemon.sprites.versions["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  imgElement.src = animatedGifSprite;

  const typeColors = pokemon.types.map((type) => {
    const color = colors[type.type.name];
    return `<div class="type" style="background-color:${color}">${type.type.name}</div>`;
  });
  
  statusElements[0].textContent = `HP - ${pokemon.stats[0].base_stat}`;
  statusElements[1].textContent = `ATTACK - ${pokemon.stats[1].base_stat}`;
  statusElements[2].textContent = `DEFENSE - ${pokemon.stats[2].base_stat}`;
  statusElements[3].textContent = `SP.ATK - ${pokemon.stats[3].base_stat}`;
  statusElements[4].textContent = `SP.DEF - ${pokemon.stats[4].base_stat}`;
  statusElements[5].textContent = `SPEED - ${pokemon.stats[5].base_stat}`;

  typesElement.innerHTML = typeColors.join("");

  if (pokemonWeaknesses) {
    const weaknessItems = pokemonWeaknesses.map(
        (weakness) => `<li class="weaknesses" style="background-color:${colors[weakness.toLowerCase()] || '#000000'}">${weakness}</li>`
    );
    weaknessesElement.innerHTML = weaknessItems.join("");
  } else {
    weaknessesElement.innerHTML = "";
  }
  
};

const pokemonId = getQueryParam("id");
if (pokemonId) {
  fetchPokemonDetails(pokemonId);
}
