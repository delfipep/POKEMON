const tipoColores = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
};

function getColorForType(typeName) {
  // Si no se encuentra el color para el tipo, devolver un color predeterminado
  return tipoColores[typeName] || "#CCCCCC";
}

const filtroInput = document.getElementById("filtro");
const cardsContainer = document.getElementById("cards");
const pokemones = document.querySelector("#pokemones");
let URL = "https://pokeapi.co/api/v2/pokemon/";

const filtrarPokemon = () => {
  const filtro = filtroInput.value.toLowerCase(); // Obtén el valor del input en minúsculas

  // Itera a través de las cartas de los Pokémon y muestra u oculta según la búsqueda
  const cards = document.querySelectorAll(".poke-card");
  
  cards.forEach((card) => {
    const nombrePokemon = card.querySelector("h2").textContent.toLowerCase();

    if (nombrePokemon.includes(filtro)) {
      card.style.display = "block"; // Muestra la carta si coincide
    } else {
      card.style.display = "none"; // Oculta la carta si no coincide
    }
  });
};

// Escucha el evento input para filtrar en tiempo real
filtroInput.addEventListener("input", filtrarPokemon);// async function listaPokemones() {

// Espera a que el documento HTML se cargue completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", async () => {

  // Aplicar filtro inicial si es necesario
  filtrarPokemon();
});

function scrollToCards() {
  const cardsSection = document.getElementById("cards");
  cardsSection.scrollIntoView({ behavior: "smooth" }); // Hace scroll suave hacia la sección de las cards
}
  

async function listaPokemones() {
  const pokemonArray = [];

  for (let i = 1; i <= 151; i++) {
    const response = await fetch(URL + i);
    const data = await response.json();
    pokemonArray.push(data);
  }

  console.log(pokemonArray); // Agrega un console.log aquí

  return pokemonArray;
}

const displayPokemonCards = async () => {
  const pokemonList = await listaPokemones();
  const cardsContainer = document.getElementById("cards");

  pokemonList.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "poke-card"; // Puedes agregar una clase CSS si lo deseas

    const pokeImage = document.createElement("img");
    pokeImage.src = pokemon.sprites.other.dream_world.front_default;
    pokeImage.className = "poke-image";

    const pokeInfo = document.createElement("div");
    pokeInfo.className = "poke-info";

    const pokeName = document.createElement("h2");
    pokeName.textContent = pokemon.name;

    const pokeTypes = document.createElement("div");
    pokeTypes.className = "poke-types";

    pokemon.types.forEach((type) => {
      const oneType = document.createElement("p");
      oneType.textContent = type.type.name;
      oneType.style.backgroundColor = getColorForType(type.type.name);

      pokeTypes.appendChild(oneType);
    });

    const pokeStats = document.createElement("div");
    pokeStats.className = "poke-stats";

    const pokeAtk = document.createElement("div");
    const atkNumber = document.createElement("h3");
    atkNumber.textContent = pokemon.stats[1].base_stat;
    const atkName = document.createElement("p");
    atkName.textContent = "Attack";
    pokeAtk.appendChild(atkNumber);
    pokeAtk.appendChild(atkName);

    const pokeDef = document.createElement("div");
    const defNumber = document.createElement("h3");
    defNumber.textContent = pokemon.stats[2].base_stat;
    const defName = document.createElement("p");
    defName.textContent = "Defense";
    pokeDef.appendChild(defNumber);
    pokeDef.appendChild(defName);

    const pokeSpd = document.createElement("div");
    const spdNumber = document.createElement("h3");
    spdNumber.textContent = pokemon.stats[5].base_stat;
    const spdName = document.createElement("p");
    spdName.textContent = "Speed";
    pokeSpd.appendChild(spdNumber);
    pokeSpd.appendChild(spdName);

    pokeStats.appendChild(pokeAtk);
    pokeStats.appendChild(pokeDef);
    pokeStats.appendChild(pokeSpd);

    card.addEventListener("click", () => {
      // Aquí puedes realizar la acción que desees cuando se hace clic en la tarjeta
      // Por ejemplo, podrías abrir una página con detalles del Pokémon
      const pokemonId = pokemon.id;
      window.location.href = `detalle.html?id=${pokemonId}`;    });

    cardsContainer.appendChild(card);

    card.appendChild(pokeImage);
    card.appendChild(pokeName);
    card.appendChild(pokeInfo);
    pokeInfo.appendChild(pokeTypes);
    pokeInfo.appendChild(pokeStats);
  });
};

// Espera a que el documento HTML se cargue completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  displayPokemonCards().catch((error) => {
    console.error(error);
  });
});
