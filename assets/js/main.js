const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;
function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
                    
                </div>
                <div class="details hidden"> 
                    <p>Weight: ${pokemon.weight}</p>
                    <p>Base Experience: ${pokemon.base_experience}</p>
                    <p>Abilities: ${pokemon.abilities.join(', ')}</p>
                </div>
                <button class="details-button">Show Details</button>
            </li>
    `;
}


function showPokemonDetails(item) {
    const allPokemonItems = document.querySelectorAll('.pokemon');
    allPokemonItems.forEach(pokemonItem => {
        if (pokemonItem !== item && pokemonItem.classList.contains('expanded')) {
            pokemonItem.classList.remove('expanded');
        }
    });

    item.classList.toggle('expanded');
}

function addClickEventToPokemonItems() {
    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach(item => {
        const detailsButton = item.querySelector('.details-button');
        detailsButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showPokemonDetails(item);
        });
    });
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        addClickEventToPokemonItems();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPokemonItems(offset, limit);

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        const qtdRecordsWithNextPage = offset + limit;

        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadPokemonItems(offset, newLimit);
            loadMoreButton.parentElement.removeChild(loadMoreButton);
        } else {
            loadPokemonItems(offset, limit);
        }
    });
});
