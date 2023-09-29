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



const filtroInput = document.getElementById("filtro");

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
  



fetch("./pokemon_data.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    localStorage.setItem("pokemons", JSON.stringify(datos));

    const cardContainer = document.querySelector("#cards");
    const datosPokemons = JSON.parse(localStorage.getItem("pokemons"));
    console.log(datosPokemons);


    if (datosPokemons) {
      datosPokemons.pokemons.forEach((pokemon) => {
        const pokeCard = document.createElement("div");
        pokeCard.classList.add("poke-card");

        const typesContainer = document.createElement("div");
        typesContainer.classList.add("poke-types");
        pokemon.type.forEach((type) => {
          const typeElement = document.createElement("p");
          typeElement.textContent = type;
          typeElement.style.backgroundColor = tipoColores[type.toLowerCase()]; 
    
          typesContainer.appendChild(typeElement);
        });

        pokeCard.innerHTML = `
                              <img class="poke-image" src="${pokemon.image.hires}">
                              <h2>${pokemon.name.english}</h2>
                              <div class="poke-info" >
                                 ${typesContainer.outerHTML} 
                                <div class="poke-stats">
                                  <div>
                                    <h3>${pokemon.base.Attack}</h3>
                                    <p>Atk</p>
                                  </div>
                                  <div>
                                    <h3>${pokemon.base.Defense}</h3>
                                    <p>Def</p>
                                  </div>
                                  <div>
                                    <h3>${pokemon.base.Speed}</h3>
                                    <p>Spd</p>
                                  </div>
                                </div>
                              </div>
                            `;

                            pokeCard.addEventListener("click", () => {
                              // Redireccionar al usuario a la página de detalles
                              window.location.href = `detalle.html?id=${pokemon.id}`;
                            });
                        
                            cardContainer.appendChild(pokeCard);
                          });
    }
});
const footerContainer = document.createElement("footer");
footerContainer.innerHTML = `
  <div class="footer-content">
  <p>¡Gracias por tu visita!</p>
  <img src="./IMG/Pikachu-8.png"
    
  </div>
`;
document.body.appendChild(footerContainer);

function mostrarDetallesPokemon(pokemon) {
  //Redireccionar a otra página para mostrar los detalles
  window.location.href = `pokedex.html?id=${pokemon.id}`;
}

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Agregar un evento click al botón de "Volver arriba"
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Agregar un evento scroll para mostrar u ocultar el botón de "Volver arriba"
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // Mostrar u ocultar el botón de "Volver arriba" según la posición del scroll
  if (scrollPosition > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }

  // Actualizar la posición de la barra de desplazamiento
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollPosition / maxScroll) * 100;
  const scrollBar = document.querySelector(".scroll-bar");
  scrollBar.style.height = scrollPercentage + "%";
});

// Evento para desplazarse a la posición del click en la barra de desplazamiento
document.querySelector(".scroll-bar").addEventListener("click", (e) => {
  const clickY = (e.clientY / window.innerHeight) * document.documentElement.scrollHeight;
  window.scrollTo({
    top: clickY,
    behavior: "smooth",
  });
});