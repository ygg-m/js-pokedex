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
// rename stat to class style
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

function evolveTrigger(evolveDetails) {
  // TODO: add more leveling variables
  if (evolveDetails.length > 1) return "complex";

  let trigger = { type: null, img: null, alt: null };
  let minLevel;

  if (evolveDetails[0].min_level !== null)
    minLevel = `<span>${evolveDetails[0].min_level}</span>`;

  switch (evolveDetails[0].trigger?.name) {
    case "level-up":
      trigger.img = "./assets/img/rare-candy.png";
      trigger.alt = "Rare Candy";
      trigger.type = "Level";
      break;
  }

  return `
    <div class="path">
      <div class="img-container">
        <img src=${trigger.img} alt=${trigger.alt} />
      </div>
      <p class="path-name">${trigger.type} ${minLevel ? minLevel : ""}</p>
      <object data="./assets/img/arrow.svg" type=""></object>
    </div>
  `;
}
