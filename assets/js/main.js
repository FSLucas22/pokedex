function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((type) => `<li class="type">${type}</li>`);
}

function convertPokemontToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}"> 
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${convertPokemonTypesToLi(pokemon.types).join('')}
            </ol>
            <img 
                src="${pokemon.photo}" 
                alt="${pokemon.name}"
            >
        </div>
    </li>
    `
}

(() => {
    pokeApi
        .getPokemons()
        .then((pokemons) => {
            const pokemonsOl = document.getElementById('pokemonList');
            const liItems = pokemons
                .map(convertPokemontToLi)
                .join('');
            pokemonsOl.innerHTML += liItems;
        })
        .catch((error) => console.log(error))
})();