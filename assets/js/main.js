const offset = 0;
const limit = 10;

const url = `https://pokeapi.co/api/v2/pokemon/?offset${offset}&limit${limit}`;
const pokemonList = document.getElementById("pokemon-list");
function pokemonHtml(pokemon) {
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
        `;
}

fetch(url)
  .then((res) => res.json())
  .then((res) => res.results)
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      pokemonList.innerHTML += pokemonHtml(res[i]);
    }
  })
  .catch((err) => console.log(err));
