const useApi = {
  apiToPokeModel(poke) {
    const pokemon = new Pokemon();
    pokemon.name = poke.name;
    pokemon.id = poke.id;
    pokemon.order = poke.order;
    pokemon.types = poke.types.map((typeSlot) => typeSlot.type.name);
    pokemon.mainType = pokemon.types[0];

    return pokemon;
  },

  getPokeDetails(poke) {
    return fetch(poke.url)
      .then((res) => res.json())
      .then(useApi.apiToPokeModel);
  },

  getPokemons(offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
      .then((res) => res.json())
      .then((res) => res.results)
      .then((pokeList) => pokeList.map((poke) => useApi.getPokeDetails(poke)))
      .then((detailList) => Promise.all(detailList))
      .catch((err) => console.log(err));
  },
};
