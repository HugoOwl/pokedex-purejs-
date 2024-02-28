
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.base_experience = pokeDetail.base_experience;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    
    pokemon.abilities = pokeDetail.abilities.map(ability => ability.ability.name);
    
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types
    pokemon.type = type
 
    pokemon.sprites = {
        front_default: pokeDetail.sprites.front_default,
        back_default: pokeDetail.sprites.back_default,
        front_shiny: pokeDetail.sprites.front_shiny,
        back_shiny: pokeDetail.sprites.back_shiny
    };
    
    pokemon.cries = {
        latest: pokeDetail.cries.latest,
        legacy: pokeDetail.cries.legacy
    };
    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
