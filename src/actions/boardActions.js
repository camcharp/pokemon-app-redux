import axios from 'axios';

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
