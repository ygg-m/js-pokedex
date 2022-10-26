const pokemonList = document.getElementById("pokemon-list");
const BtnLoadMore = document.getElementById("btn-load-more");
const limit = 10;
let offset = 0;

BtnLoadMore.addEventListener("click", () => {
  offset += limit;
  loadPokeCards(offset, limit);
});

function pokeCard(pokemon) {
  const { name, order, types, id, mainType } = pokemon;
  return `
    <div class="pokemon ${mainType}">
        <p class="number">#${order}</p>
        <p class="name">${name}</p>
        <div class="types">
          ${types.map((type) => `<p class=${type}>${type}</p>`).join("")}
        </div>
        <div class="image">
          <img
            src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
            alt="${name}"
          />
        </div>
    </div>
        `;
}

function loadPokeCards(offset, limit) {
  useApi
    .getPokemons(offset, limit)
    .then((res = []) => {
      pokemonList.innerHTML += res.map(pokeCard).join("");
    })
    .catch((err) => console.log(err));
}

loadPokeCards(offset, limit);
