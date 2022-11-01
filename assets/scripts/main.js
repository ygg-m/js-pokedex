// ui elements
const pokemonList = document.getElementById("pokemon-list");
const BtnLoadMore = document.getElementById("btn-load-more");
const modal = document.getElementById("modal");

// api variables
const maxCardLoad = 151;
const limit = 20;
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
      res.map((pokemon) => drawPokeCard(pokemon));
    })
    .catch((err) => console.log(err));
}

// first load
loadPokeCards(offset, limit);

//
function drawPokeCard(pokemon) {
  const { name, types, id, mainType } = pokemon;
  const imgURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  // create ui
  const pokeCard = document.createElement("article");
  const info = document.createElement("div");
  const number = document.createElement("p");
  const pokeName = document.createElement("p");
  const typesContainer = document.createElement("div");
  const type = document.createElement("p");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");

  // add classes
  pokeCard.classList.add("pokemon", mainType);
  info.classList.add("info");
  number.classList.add("number");
  pokeName.classList.add("name");
  typesContainer.classList.add("types");
  type.classList.add("type");
  imgContainer.classList.add("image");

  // add content
  number.innerText = "#" + lpad(id, 3, 0);
  pokeName.innerText = name;
  img.src = imgURL + id + ".png";
  img.alt = name;

  // draw the card
  pokemonList.append(pokeCard);
  pokeCard.append(info, imgContainer);
  info.append(number, pokeName, typesContainer);
  imgContainer.append(img);

  // add event listener
  pokeCard.addEventListener("click", () => {
    console.log("click");
  });

  // add types
  typesContainer.innerHTML = `${types
    .map((type) => `<p class=${type}>${type}</p>`)
    .join("")}`;
}

// returns the string with 0 before it
lpad = function (string, width, char) {
  return string.length >= width
    ? string
    : (new Array(width).join(char) + string).slice(-width);
};

function addListeners() {
  for (var i = 0; i < pokeCardList.length; i++) {
    pokeCardList[i].addEventListener("click", () => {
      console.log("click");
    });
  }
}
