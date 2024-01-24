class Pagination extends Subject {
    offset;
    limit;
    
    observerFunctions = [];

    constructor(offset=0, limit=5) {
        super();
        this.offset = offset;
        this.limit = limit;
    }

    nextPage() {
        this.offset += this.limit;
        this.notifyObservers();
    }
}

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
    const pagination = new Pagination(0, 10);

    pagination.registerObserverFunction(loadItens);

    loadItens(pagination.offset, pagination.limit);

    loadMoreButton.addEventListener('click', () => pagination.nextPage())
})();