import axios from 'axios';

// premier appel à l'API
export const getPokemons = () => {
	console.log('lalala');
	return (dispatch) => {
		axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20').then((res) => {
			dispatch({
				type: 'FETCH_POKEMONS',
				pokemons: res.data.results,
				next: res.data.next,
				previous: res.data.previous,
				searchField: ""
			});
			axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=964').then((res) => {
				dispatch({
					type: 'FETCH_ALL_POKEMONS',
					allPokemons: res.data.results
				});
			});
		});
	};
};

// aller chercher les pokemons suivants/précédents
export const getNewPokemons = (url) => {
	return (dispatch) => {
		axios.get(url).then((res) => {
			dispatch({
				type: 'FETCH_NEW_POKEMONS',
				pokemons: res.data.results,
				next: res.data.next,
				previous: res.data.previous
			});
		});
	};
};

// ajouter un pokemon aux favoris
export const likePokemon = (pokemon, newLikedPokemons) => {
	return (dispatch) => {
		dispatch({
			type: 'LIKE_POKEMON',
			likedPokemons: newLikedPokemons,
			pokemon
		});
	};
};

// enlever un pokemon des favoris
export const dislikePokemon = (pokemon) => {
	return (dispatch) => {
		dispatch({
			type: 'DISLIKE_POKEMON',
			pokemon
		});
	};
};

// aller à la page pokemons
export const goToPagePokemons = () => {
	return (dispatch) => {
		dispatch({
			type: 'GO_TO_POKEMONS',
			view: 1
		});
	};
};

// aller à la page favoris
export const goToPageFavourites = () => {
	return (dispatch) => {
		dispatch({
			type: 'GO_TO_FAVOURITES',
			view: 2
		});
	};
};

// chercher un Pokemon
export const searchPokemon = (input) => {
	return (dispatch) => {
		dispatch({
			type: 'SEARCH_POKEMON',
			searchField: input
		});
	};
};
