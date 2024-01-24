const API_URL = "https://pokeapi.co/api/v2/pokemon"

function convertPokeApiDetailToPokemon(detail) {
    const pokemon = new Pokemon();
    pokemon.name = detail.name;
    pokemon.number = detail.id;
    pokemon.types = detail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = pokemon.types;
    pokemon.type = type;
    pokemon.photo = detail.sprites.other.dream_world.front_default;

    return pokemon;
}

const pokeApi = {
    getPokemonDetail(pokemon) {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
    },

    getPokemons(offset=0, limit=5) {
        return fetch(API_URL + `?offset=${offset}&limit=${limit}`)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(this.getPokemonDetail))
            .then((pokemonsDetails) => Promise.all(pokemonsDetails));
    }
}