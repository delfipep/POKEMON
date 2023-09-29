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


// Obtener el ID del Pokémon de la URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

const volverButton = document.getElementById("volver");
volverButton.addEventListener("click", () => {
  // Redireccionar al usuario a la página principal
  window.location.href = "index.html"; // Reemplaza con la URL correcta de tu página principal
});


// Recuperar datos del Pokémon desde tu JSON o API
// Reemplaza esto con tu propia lógica para cargar los detalles del Pokémon
fetch("./pokemon_data.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    const pokemon = datos.pokemons.find(
      (p) => p.id === parseInt(pokemonId, 10)
    );

    if (pokemon) {
      // Actualizar el contenido de la página de detalle
      const detailContainer = document.getElementById("pokemon-detail");
      detailContainer.innerHTML = `
      <div class="flex">
      <div class="left">
      <div class="title">
      <h1>${pokemon.name.english}</h1>
      <div class="poke-types">
      ${pokemon.type
                  .map(
                    (type) => `
                    <p style="background-color: ${
                    tipoColores[type.toLowerCase()]
                  }">${type}</p>
                `
                  )
                  .join("")}
                 </div>
              </div>
            <img src="${pokemon.image.hires}" alt="${pokemon.name.english}">
          </div>
              
          
          <div class="right">
              <div class="poke-stats">
              <h2>statistic</h2>
                  <div>
                    <p>HP</p>
                    <h3>${pokemon.base.HP}</h3>
                  </div>
                  
                  <div>
                    <p>Attack</p>
                    <h3>${pokemon.base.Attack}</h3>
                  </div>
                  
                  <div>
                    <p>Defense</p>
                    <h3>${pokemon.base.Defense}</h3>
                  </div>
                  
                  <div>
                    <p>Sp. Attack</p>
                    <h3>${pokemon.base["Sp. Attack"]}</h3>
                  </div>
                  
                  <div>
                    <p>Sp. Defense</p>
                    <h3>${pokemon.base["Sp. Defense"]}</h3>
                  </div>
                  
                  <div>
                    <p>Speed</p>
                    <h3>${pokemon.base.Speed}</h3>
                  </div>
                </div>
                    <div class="species">
                <h2>Species:</h2>
                <p>${pokemon.species}</p>
              </div>
              <div class="description">
                <h2>Description:</h2>
                <p>${pokemon.description}</p>
              </div>
            </div>
        </div>
      `;
    }

  })
  
  
  .catch((error) => {
    console.error("Error al cargar los detalles del Pokémon:", error);
  });

  const footerContainer = document.createElement("footer");
  footerContainer.innerHTML = `
    <div class="footer-content">
    
      <p>¡Gracias por tu visita!</p>
      <img src="/IMG/Pikachu-8.png"
    </div>
  `;
  document.body.appendChild(footerContainer);