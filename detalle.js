// Obtiene el ID o nombre del Pokémon de la URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

// Luego, puedes usar este ID o nombre para cargar los detalles del Pokémon
// Realiza una solicitud a la PokeAPI utilizando el ID o nombre
const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
fetch(URL)
  .then((response) => response.json())
  .then((pokemon) => {
    // Ahora puedes mostrar los detalles del Pokémon en la página de detalles
    // Por ejemplo, puedes establecer el nombre, imagen y otros datos del Pokémon en elementos HTML
    document.getElementById("detail-name").textContent = pokemon.name;
    document.getElementById("detail-image").src = pokemon.sprites.other.dream_world.front_default;
    // ...
  })
  .catch((error) => {
    console.error(error);
  });






  