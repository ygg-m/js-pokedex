const useApi = {
  apiToPokeModel(poke) {
    const pokeEvolution = poke[0].chain;
    const pokeInfo = poke[1];

    // console.log(pokeEvolution);

    const pokemon = new Pokemon();
    pokemon.name = pokeInfo.name;
    pokemon.id = pokeInfo.id;
    pokemon.order = pokeInfo.order;
    pokemon.abilities = pokeInfo.abilities;
    pokemon.height = pokeInfo.height;
    pokemon.weight = pokeInfo.weight;
    pokemon.types = pokeInfo.types.map((typeSlot) => typeSlot.type.name);
    pokemon.stats = pokeInfo.stats;
    pokemon.mainType = pokeInfo.types[0].type.name;
    pokemon.imgURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
      pokeInfo.id +
      ".png";

    pokemon.spriteURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      pokeInfo.id +
      ".png";

    pokemon.unevolvedName = pokeEvolution?.species?.name;
    pokemon.evolutionList = pokeEvolution?.evolves_to;

    

    // TODO: Add evolution info

    return pokemon;
  },

  getPokeDetails(poke) {
    const pokeEvolutions = useApi.getEvolutions(poke.name);
    const pokeInfo = fetch(poke.url).then((res) => res.json());

    return Promise.all([pokeEvolutions, pokeInfo])
      .then((res) => useApi.apiToPokeModel(res))
      .catch((err) => console.log(err));
  },

  getEvolutions(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => fetch(res.evolution_chain.url))
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
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
