// ui elements
const pokemonList = document.getElementById("pokemon-list");
const BtnLoadMore = document.getElementById("btn-load-more");
const modal = document.getElementById("modal");

// api variables
const maxCardLoad = 1510;
const limit = 100;
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

// draw poke cards at main page
function drawPokeCard(pokemon) {
  const { name, imgURL, types, mainType } = pokemon;

  // create ui
  const pokeCard = document.createElement("article");

  // add classes
  pokeCard.classList.add("pokemon", mainType);

  // draw the card
  pokemonList.append(pokeCard);
  pokeCard.innerHTML = drawCard(pokemon);

  // add event listener
  pokeCard.addEventListener("click", () => {
    drawModalWithPokemon(pokemon);
    toggleModal();
  });
}

// draw modal on click
async function drawModalWithPokemon(pokemon) {
  const {
    name,
    imgURL,
    types,
    abilities,
    id,
    mainType,
    weight,
    height,
    stats,
    evolutionChain,
    unevolved,
    firstEvolution,
    secondEvolution,
  } = pokemon;
  const pokeNumber = lpad(id, 3, 0);
  //-----------------------------------------

  // clean modal HTML
  resetModal();

  // close button
  const closeButton = document.createElement("img");
  closeButton.id = "close-button";
  closeButton.src = "./assets/img/close.svg";

  // close modal button
  closeButton.addEventListener("click", () => {
    toggleModal();
    modal.classList.remove(mainType);
  });

  // header
  const header = document.createElement("div");
  const number = document.createElement("h3");
  const pokeName = document.createElement("h2");
  header.classList.add("header");
  number.innerHTML = `<span>#</span>${pokeNumber}</h3>`;
  pokeName.innerHTML = `<h2 class="name">${name}</h2>`;
  header.append(number, pokeName, closeButton);

  // main content
  const mainContent = document.createElement("div");

  // modal classes
  modal.classList.add(mainType);

  // draw ui
  modal.append(header);
  modal.append(mainContent);
  mainContent.innerHTML += `
      ${drawModal.showcase(imgURL, name)}
      <div class="content">
        <div class="main-info-container">
          ${drawModal.types(types)}
          ${drawModal.abilities(abilities)}
          ${drawModal.weightHeight(weight, height)}
        </div>
        ${drawModal.stats(stats)}

        <div class="evolutions-container">
          <p class="title">Evolutions</p>
              ${
                // If pokémon doesn't have any evolution
                // return only unevolved info
                firstEvolution.length === 0
                  ? `
                    ${name} doesn't evolve.
                    <div class="evolution-path">
                      ${drawModal.evolution.card(unevolved)}
                    </div>`
                  : // if pokémon have evolution
                    // return a map of it's Evolution List
                    `${firstEvolution
                      .map((evolution) => {
                        return `
                      <div class="evolution-path">
                        ${drawModal.evolution.card(unevolved)}
                        ${drawModal.evolution.path()}
                        ${drawModal.evolution.card(evolution)}

                        <!-- 3rd evolution  --------------------------------- -->
                        ${
                          secondEvolution.length !== 0
                            ? `${drawModal.evolution.path()}
                              ${drawModal.evolution.card(secondEvolution[0])}`
                            : ""
                        }
                      </div>
                  `;
                      })
                      .join("")}`
              }

        </div>
      </div>`;
}

// returns the string with 0 before it
lpad = function (string, width, char) {
  return string.length >= width
    ? string
    : (new Array(width).join(char) + string).slice(-width);
};
