import axios from 'axios';

// premier appel à l'API
export const getPokemons = () => {
	return (dispatch, getState) => {
		axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20').then((res) => {
			dispatch({
				type: 'FETCH_POKEMONS',
				pokemons: res.data.results,
				likedPokemons: [],
				next: res.data.next,
				previous: res.data.previous
			});
			console.log(res.data.results);
			console.log('current state:', getState());
		});
	};
};

// appel quand l'utilisateur clique sur "previous" ou "next"
export const getNewPokemons = (url) => {
	return (dispatch, getState) => {
		axios.get(url).then((res) => {
			dispatch({
				type: 'FETCH_NEW_POKEMONS',
				pokemons: res.data.results,
				next: res.data.next,
				previous: res.data.previous
			});
			console.log(res.data.results);
			console.log('current state:', getState());
		});
	};
};

export const goToPagePokemons = () => {
	return (dispatch, getState) => {
			dispatch({
				type: 'GO_TO_POKEMONS',
				view: 1
			});
			console.log('current state:', getState());
	};
};

export const goToPageFavourites = () => {
	return (dispatch, getState) => {
			dispatch({
				type: 'GO_TO_FAVOURITES',
				view: 2
			});
			console.log('current state:', getState());
	};
};