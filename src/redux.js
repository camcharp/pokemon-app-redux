// import { createStore } from 'redux';

// const initState = {
// 	pokemons: [
// 		{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
// 	]
// };

// function rootReducer(state = initState, action) {
// 	if (action.type === 'ADD_POKEMONS') {
// 		// return Object.assign({}, state, {
// 		// 	pokemons: state.pokemons.concat(action.payload)
// 		// });
// 		return {
// 			...state,
// 			pokemons: [ ...state.pokemons, action.name ]
// 		};
// 	}
// 	return state;
// }

// const store = createStore(rootReducer);

// store.suscribe(() => {
// 	console.log('state updated', store.getState());
// });

// const addPokemons = { type: 'ADD_POKEMONS', name: 'Bulbizar' };

// store.dispatch(addPokemons);
