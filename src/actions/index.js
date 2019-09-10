// import axios from 'axios';
// import { FETCH_POKEMONS_PENDING, FETCH_POKEMONS_SUCCESS, FETCH_POKEMONS_ERROR } from './boardActions';

// const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

// export const getData = () => {
// 	return (dispatch) => {
// 		dispatch({
// 			type: FETCH_POKEMONS_PENDING
// 		});
// 		return axios
// 			.get(url)
// 			.then((res) => {
// 				dispatch({
// 					type: FETCH_POKEMONS_SUCCESS,
// 					payload: res.data
// 				});
// 			})
// 			.catch((error) => {
// 				dispatch({
// 					type: FETCH_POKEMONS_ERROR,
// 					payload: ''
// 				});
// 			});
// 	};
// };
