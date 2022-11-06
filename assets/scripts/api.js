const useApi = {
  apiToPokeModel(poke) {
    const pokeEvolution = poke[0];
    const pokeInfo = poke[1];

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

    pokemon.evolutionChain = poke[0].chain;

    // TODO: Add all evolution info

    return pokemon;
  },

  getPokeDetails(poke) {
    const pokeEvolutions = useApi.getEvolutions(poke.name);
    const pokeInfo = fetch(poke.url).then((res) => res.json());
    return Promise.all([pokeEvolutions, pokeInfo])
      .then((res) => useApi.apiToPokeModel(res))
      .catch((err) => console.log(err));
  },

  getMainInfo(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res);
  },

  buildEvolutionPath(chain, pokemonList, evolutionPaths) {
    let pokemon = {
      evolution_details: chain.evolution_details,
      name: chain.species.name,
      url: chain.species.url,
    };
    pokemonList.push(pokemon);
    if (chain.evolves_to.length > 0) {
      for (var newChain of chain.evolves_to) {
        useApi.buildEvolutionPath(
          newChain,
          JSON.parse(JSON.stringify(pokemonList)),
          evolutionPaths
        );
      }
    } else {
      evolutionPaths.push(JSON.parse(JSON.stringify(pokemonList)));
    }
  },

  getEvolutions(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => fetch(res.evolution_chain.url)) // fetch url from first fetch
      .then((res) => res.json())
      .then((res) => {
        const unevolved = useApi.getMainInfo(res.chain.species.name); // get unevolved info
        const evolutionDetails = []; // store data from 1rst evolution
        const evolution2Details = []; // store data from 2nd evolution

        const evolutionList = res.chain.evolves_to; // evolution list from api

        evolutionList.map((evolution) => {
          // maps all 1rst evolutions
          evolutionDetails.push(useApi.getMainInfo(evolution.species.name)); // push first evolution

          // if it doesn't have 2nd evolution returns
          if (
            evolution.evolves_to[0].species.name === null ||
            evolution.evolves_to[0].species.name === undefined
          )
            return;

          // maps all 2nd evolution
          evolution.evolves_to?.map((evolution2) =>
            evolution2Details.push(useApi.getMainInfo(evolution2.species?.name))
          );
        });

        // resolves evolution Promises
        const evolutionDetailsPromise = Promise.all(evolutionDetails);
        const evolution2DetailsPromise = Promise.all(evolution2Details);

        // returns everything
        return Promise.all([
          unevolved,
          evolutionDetailsPromise,
          evolution2DetailsPromise,
        ]);
      })
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
