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
};
