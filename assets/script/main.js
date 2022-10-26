// ui elements
const pokemonList = document.getElementById("pokemon-list");
const BtnLoadMore = document.getElementById("btn-load-more");

// api variables
const maxCardLoad = 151;
const limit = 10;
let offset = 0;

// button, load more cards
BtnLoadMore.addEventListener("click", () => {
  offset += limit;
  const nextPageCardCount = offset + limit;

  if (nextPageCardCount >= maxCardLoad) {
    const newLimit = maxCardLoad - offset;
    loadPokeCards(offset, newLimit);

    BtnLoadMore.parentElement.removeChild(BtnLoadMore);
  } else {
    loadPokeCards(offset, limit);
  }
});

// load pokemon cards
function loadPokeCards(offset, limit) {
  useApi
    .getPokemons(offset, limit)
    .then((res = []) => {
      pokemonList.innerHTML += res
        .map((pokemon) => {
          const { name, types, id, mainType } = pokemon;
          return `
          <div class="pokemon ${mainType}">
              <p class="number">#${id}</p>
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
        })
        .join("");
    })
    .catch((err) => console.log(err));
}

// first load
loadPokeCards(offset, limit);
