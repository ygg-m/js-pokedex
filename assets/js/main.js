const pokemonList = document.getElementById("pokemon-list");
function pokeCard(pokemon) {
  const { name } = pokemon;
  return `
    <div class="pokemon">
        <p class="number">#001</p>
        <p class="name">${name}</p>
        <div class="types">
          <p>grass</p>
          <p>poison</p>
        </div>
        <div class="image">
          <img
            src="https://archives.bulbagarden.net/media/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png"
            alt="${name}"
          />
        </div>
    </div>
        `;
}

useApi
  .getPokemons()
  .then((res = []) => {
    pokemonList.innerHTML += res.map(pokeCard).join("");
  })
  .catch((err) => console.log(err));
