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


function mostrarDetallesPokemon(pokemon) {
  //Redireccionar a otra página para mostrar los detalles
  window.location.href = `pokedex.html?id=${pokemon.id}`;
}
