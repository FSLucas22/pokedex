function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((type) => `<li class="type ${type}">${type}</li>`);
}

function convertPokemonsToLi(pokemon) {
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

loadPokemonItens = (pokemonOl) => (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonsToLi).join('');
        pokemonOl.innerHTML += newHtml;
    })
    .catch((error) => console.log(error));
}


(() => {
    const pokemonsOl = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const loadItens = loadPokemonItens(pokemonsOl)
    let offset = 0;
    const limit = 10;
    const maxRecords = 151;

    loadItens(offset, limit);

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        const qtdRecordsNextPage = offset + limit;
        
        if (qtdRecordsNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadItens(offset, newLimit);
            loadMoreButton.parentElement.removeChild(loadMoreButton);
            return;
        }
        loadItens(offset, limit);
    })
})();