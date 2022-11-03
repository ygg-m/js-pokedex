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

// draw poke cards at main page
function drawPokeCard(pokemon) {
  const { name, imgURL, types, id, mainType } = pokemon;
  const pokeNumber = "#" + lpad(id, 3, 0);

  // create ui
  const pokeCard = document.createElement("article");

  // add classes
  pokeCard.classList.add("pokemon", mainType);

  // draw the card
  pokemonList.append(pokeCard);
  pokeCard.innerHTML = `
      <div class="info">
        <p class="number">${pokeNumber}</p>
        <p class="name">${name}</p>
        <div class="types">
          ${types.map((type) => `<p class=${type}>${type}</p>`).join("")}
        </div>
      </div>
      <div class="image">
        <img
          src=${imgURL}
          alt=${name}
        />
      </div>`;

  // add event listener
  pokeCard.addEventListener("click", () => {
    drawModalWithPokemon(pokemon);
    toggleModal();
  });
}

// toggle modal on/off
function toggleModal() {
  modal.classList.toggle("hide");
}

// reset modal
function resetModal() {
  modal.innerHTML = "";
}

// change stats names
function renameStat(stat) {
  switch (stat) {
    case "hp":
      return "HP";
    case "attack":
      return "Atk";
    case "defense":
      return "Def";
    case "special-attack":
      return "S.Atk";
    case "special-defense":
      return "S.Def";
    case "speed":
      return "Spd";
  }
}

function renameClass(stat) {
  switch (stat) {
    case "hp":
      return "hp";
    case "attack":
      return "atk";
    case "defense":
      return "def";
    case "special-attack":
      return "atk";
    case "special-defense":
      return "def";
    case "speed":
      return "spd";
  }
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
  } = pokemon;
  const pokeNumber = lpad(id, 3, 0);
  // -----------------------------------------
  // get evolution chain
  const { chain } = await useApi.getEvolutions(id);

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
  <div class="showcase">
  <img
          src=${imgURL}
          alt=${name}
        />
      </div>
      <div class="content">
        <div class="main-info-container">
          <div class="row types">
            <p class="title">Type</p>
            <ul class="list">
              ${types.map((type) => `<p class=${type}>${type}</p>`).join("")}
            </ul>
          </div>
          <div class="row abilities">
            <p class="title">Abilities</p>
            <ul class="list">
              ${abilities
                .map((e) => `<p class="ability">${e.ability.name}</p>`)
                .join("")}
            </ul>
          </div>
          <div class="row weight-height">
            <div class="flex">
              <p class="title">Weight</p>
              <p class="content">${weight / 10} <span>kg</span></p>
            </div>
            <div class="flex">
              <p class="title">Height</p>
              <p class="content">${height / 10} <span>m</span></p>
            </div>
          </div>
        </div>
        <div class="stats-container">
          <p class="title">Stats</p>
          <div class="content">
            ${stats
              .map((stat) => {
                const value = stat.base_stat;
                const statName = renameStat(stat.stat.name);
                const className = renameClass(stat.stat.name);
                return `
              <div class="stat ${className}">
                <p class="title">${statName}</p>
                <p class="content">${value}</p>
              </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <div class="evolutions-container">
          <p class="title">Evolutions</p>
          ${chain.evolves_to.map((evolution) => {
            console.log(evolution);

            return `
              <div class="evolution-path">
                <div class="evolution grass">
                  <div class="img-container">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                      alt="Bulbasaur"
                    />
                  </div>
                  <p class="name">${chain.species.name}</p>
                  <div class="types">
                    <p class="type grass">Grass</p>
                    <p class="type poison">Poison</p>
                  </div>
                </div>

                <div class="path">
                  <div class="img-container">
                    <img src="./assets/img/rare-candy.png" alt="Rare Candy" />
                  </div>
                  <p class="path-name">${evolution.evolution_details[0].trigger.name} <span>${evolution.evolution_details[0].min_level}</span></p>
                  <object data="./assets/img/arrow.svg" type=""></object>
                </div>

                <div class="evolution grass">
                  <div class="img-container">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                      alt="Ivysaur"
                    />
                  </div>
                  <p class="name">Ivysaur</p>
                  <div class="types">
                    <p class="type grass">Grass</p>
                    <p class="type poison">Poison</p>
                  </div>
                </div>

                <div class="path">
                  <div class="img-container">
                    <img src="./assets/img/rare-candy.png" alt="Rare Candy" />
                  </div>
                  <p class="path-name">Level <span>7</span></p>
                  <object data="./assets/img/arrow.svg" type=""></object>
                </div>

                <div class="evolution grass">
                  <div class="img-container">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
                      alt="Venusaur"
                    />
                  </div>
                  <p class="name">Venusaur</p>
                  <div class="types">
                    <p class="type grass">Grass</p>
                    <p class="type poison">Poison</p>
                  </div>
                </div>
              </div>
          `;
          })}
          
        </div>
      </div>`;
}

// returns the string with 0 before it
lpad = function (string, width, char) {
  return string.length >= width
    ? string
    : (new Array(width).join(char) + string).slice(-width);
};
