const drawModal = {
  showcase(imgURL, pokeName) {
    return `
      <div class="showcase">
          <img
              src=${imgURL}
              alt=${pokeName}
          />
      </div>`;
  },

  types(types) {
    return `
      <div class="row types">
          <p class="title">Type</p>
          <ul class="list">
              ${types.map((type) => `<p class=${type}>${type}</p>`).join("")} 
          </ul>
      </div>`;
  },

  abilities(abilities) {
    return `
      <div class="row abilities">
          <p class="title">Abilities</p>
          <ul class="list">
              ${abilities
                .map((e) => `<p class="ability">${e.ability.name}</p>`)
                .join("")}
          </ul>
      </div>`;
  },

  weightHeight(weight, height) {
    return `
      <div class="row weight-height">
          <div class="flex">
              <p class="title">Weight</p>
              <p class="content">${weight / 10} <span>kg</span></p>
          </div>
          <div class="flex">
              <p class="title">Height</p>
              <p class="content">${height / 10} <span>m</span></p>
          </div>
      </div>`;
  },

  stats(stats) {
    return `
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
      </div>`;
  },

  evolution: {
    path(trigger) {
      return `
      <div class="path">
        <div class="img-container">
          <img src="./assets/img/rare-candy.png" alt="Rare Candy" />
        </div>
        <p class="path-name">Level <span>7</span></p>
        <object data="./assets/img/arrow.svg" type=""></object>
      </div>
      `;
    },

    card(poke) {
      const { id, name, types } = poke;
      return `
        <div class="evolution ${types[0].type.name}">
          <div class="img-container">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
              alt=${name}
            />
          </div>
            <p class="name">${name}</p>
          <div class="types">
          ${types
            .map((e) => `<p class=${e.type.name}>${e.type.name}</p>`)
            .join("")} 
          </div>
        </div>`;
    },
  },
};

const drawCard = (pokemon) => {
  const { name, imgURL, types, id } = pokemon;
  const pokeNumber = "#" + lpad(id, 3, 0);

  return `
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
    </div>
  `;
};
