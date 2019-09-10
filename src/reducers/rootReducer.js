const initState = {
	pokemons: [],
	view: 1
};

const rootReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_POKEMONS':
			console.log('pokemons fetched', action);
			return {
				...state,
				pokemons: action.pokemons,
				next: action.next,
				previous: action.previous
			};
		case 'FETCH_NEW_POKEMONS':
			console.log('new pokemons fetched', action);
			return {
				...state,
				pokemons: action.pokemons,
				next: action.next,
				previous: action.previous
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
		default:
			return state;
	}
};

export default rootReducer;
