// import { FETCH_POKEMONS_PENDING, FETCH_POKEMONS_SUCCESS, FETCH_POKEMONS_ERROR } from '../actions/boardActions';

// const initState = {
// 	pending: false,
// 	pokemons: [],
// 	error: null
// };

// export default function pokemonsReducer(state = initState, action) {
// 	switch (action.type) {
// 		case FETCH_POKEMONS_PENDING:
// 			return {
// 				...state,
// 				pending: true
// 			};
// 		case FETCH_POKEMONS_SUCCESS:
// 			return {
// 				...state,
// 				pending: false,
// 				pokemons: action.payload
// 			};
// 		case FETCH_POKEMONS_ERROR:
// 			return {
// 				...state,
// 				pending: false,
// 				error: action.error
// 			};
// 		default:
// 			return state;
// 	}
// }

// export const getPokemons = (state) => state.pokemons;
// export const getPokemonsPending = (state) => state.pending;
// export const getPokemonsError = (state) => state.error;

// /////////////////////////////////////////////////////////

// const initState = {
// 	pokemons: [],
// 	loading: false,
// 	error: null
// };

// const rootReducer = (state = initState, action) => {
// 	switch (action.type) {
// 		case FETCH_POKEMONS_PENDING:
// 			return {
// 				...state,
// 				loading: true
// 			};
// 		case FETCH_POKEMONS_SUCCESS:
// 			return {
// 				...state,
// 				pokemons: action.payload
// 			};
// 		case FETCH_POKEMONS_ERROR:
// 			return {
// 				...state,
// 				error: 'An error occurred while getting data.'
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default rootReducer;

// /////////////////////////////////////////////////////////

const initState = {
	pokemons: [
		{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
		{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
	]
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
		default:
			return state;
	}
};

// const rootReducer = (state = initState, action) => {
// 	return state;
// };

export default rootReducer;
