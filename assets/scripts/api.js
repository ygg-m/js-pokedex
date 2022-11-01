const useApi = {
  apiToPokeModel(poke) {
    const pokemon = new Pokemon();
    pokemon.name = poke.name;
    pokemon.id = poke.id;
    pokemon.order = poke.order;
    pokemon.abilities = poke.abilities;
    pokemon.height = poke.height;
    pokemon.weight = poke.weight;
    pokemon.types = poke.types.map((typeSlot) => typeSlot.type.name);
    pokemon.stats = poke.stats;
    pokemon.mainType = pokemon.types[0];
    pokemon.imgURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
      poke.id +
      ".png";

    pokemon.spriteURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      poke.id +
      ".png";

    return pokemon;
  },

  getPokeDetails(poke) {
    return fetch(poke.url)
      .then((res) => res.json())
      .then(useApi.apiToPokeModel);
  },

  getSpecies(poke) {
    const url = "https://pokeapi.co/api/v2/pokemon-species/";
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res.results);
  },

  getPokemons(offset = 0, limit = 20) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
      .then((res) => res.json())
      .then((res) => res.results)
      .then((pokeList) => pokeList.map((poke) => useApi.getPokeDetails(poke)))
      .then((detailList) => Promise.all(detailList))
      .catch((err) => console.log(err));
  },
};
