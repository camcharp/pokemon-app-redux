const initState = {
	pokemons: [],
	likedPokemons: [],
	view: 1
};

const rootReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_POKEMONS':
			return {
				...state,
				pokemons: action.pokemons,
				next: action.next,
				previous: action.previous,
				searchField: null
			};
		case 'FETCH_ALL_POKEMONS':
			return {
				...state,
				allPokemons: action.allPokemons
			};
		case 'FETCH_NEW_POKEMONS':
			return {
				...state,
				pokemons: action.pokemons,
				next: action.next,
				previous: action.previous
			};
		case 'LIKE_POKEMON':
			return Object.assign({}, state, {
				likedPokemons: action.likedPokemons
			});
		case 'DISLIKE_POKEMON':
			return {
				...state,
				likedPokemons: state.likedPokemons.filter((pokemon) => pokemon.name !== action.pokemon.name)
			};
		case 'GO_TO_POKEMONS':
			return {
				...state,
				view: 1
			};
		case 'GO_TO_FAVOURITES':
			return {
				...state,
				view: 2
			};
		case 'SEARCH_POKEMON':
			return {
				...state,
				searchField: action.searchField,
				next: null,
				previous: null
			};
		default:
			return state;
	}
};

export default rootReducer;
