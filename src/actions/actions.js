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
			console.log('current state:', getState());
		});
	};
};

export const likePokemon = (pokemon, newLikedPokemons) => {
	return (dispatch, getState) => {
		dispatch({
			type: 'LIKE_POKEMON',
			likedPokemons: newLikedPokemons,
			pokemon: pokemon
		});
		console.log(newLikedPokemons);
		console.log('current state:', getState());
	};
};

export const dislikePokemon = (pokemon) => {
	return (dispatch, getState) => {
		dispatch({
			type: 'DISLIKE_POKEMON',
			pokemon
		});
		console.log(pokemon);
		console.log('current state:', getState());
	};
};

export const goToPagePokemons = () => {
	return (dispatch, getState) => {
		dispatch({
			type: 'GO_TO_POKEMONS',
			view: 1
		});
	};
};

export const goToPageFavourites = () => {
	return (dispatch, getState) => {
		dispatch({
			type: 'GO_TO_FAVOURITES',
			view: 2
		});
	};
};
