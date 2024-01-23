const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}"
const pokeApi = {
    getPokemonDetail(pokemon) {
        return fetch(pokemon.url)
            .then((response) => response.json())
    },

    getPokemons(offset=0, limit=5) {
        return fetch(API_URL + `?offset=${offset}&limit=${limit}`)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(this.getPokemonDetail))
            .then((details) => Promise.all(details))
            .then((pokemonsDetails) => pokemonsDetails);
    }
}