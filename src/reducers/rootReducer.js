const initState = {
	pokemons: [],
	likedPokemons: [],
	searchField: ""
};

const rootReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_POKEMONS':
			return {
				...state,
				pokemons: action.pokemons,
				next: action.next,
				previous: action.previous,
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
		case 'SEARCH_POKEMON':
			return {
				...state,
				searchField: action.searchField,
			};
		default:
			return state;
	}
};

export default rootReducer;
