function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}`);
}

function convertPokemontToLi(pokemon) {
    return `
    <li class="pokemon"> 
        <span class="number">#${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${convertPokemonTypesToLi(pokemon.types).join('')}
            </ol>
            <img 
                src="${pokemon.sprites.other.dream_world.front_default}" 
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