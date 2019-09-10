import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { getPokemons } from '../actions/boardActions';

// components
import Header from './Header';
import Pagination from './Pagination';
import Tile from './Tile';
import TileFavourite from './TileFavourite';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			likedPokemons: [],
			next: null,
			previous: null,
			view: 1 // "page" Pokemons:1, "page" Favoris:2
		};
	}

	goToPokemonsPage = (e) => {
		e.preventDefault();
		this.setState({ view: 1 });
	};

	goToFavouritesPage = (e) => {
		e.preventDefault();
		this.setState({ view: 2 });
	};

	addFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		const likedPokemonsCopy = [ ...this.state.likedPokemons ];
		if (!likedPokemonsCopy.some((p) => p.name === pokemon.name)) likedPokemonsCopy.push(pokemon);
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	removeFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		let likedPokemonsCopy = [ ...this.state.likedPokemons ];
		for (let i = 0; i < likedPokemonsCopy.length; i++) {
			if (likedPokemonsCopy[i].name === pokemon.name) {
				likedPokemonsCopy.splice(likedPokemonsCopy[i], 1);
			}
		}
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	componentDidMount() {
		this.props.getPokemons();
	}

	render() {
		return (
			<div className="page-wrapper">
				<Header goToPokemonsPage={this.goToPokemonsPage} goToFavouritesPage={this.goToFavouritesPage} />
				{this.state.view === 1 &&
				this.props.pokemons && (
					<Pagination
						data={this.state}
						handlePreviousClick={this.handlePreviousClick}
						handleNextClick={this.handleNextClick}
					/>
				)}
				<div className="big-container">
					{/* Page Pokemons */}
					{this.state.view === 1 &&
						this.props.pokemons &&
						this.props.pokemons.map((pokemon) => (
							<Tile
								likedPokemons={this.state.likedPokemons}
								key={pokemon.url}
								data={pokemon}
								addFavouritePokemon={this.addFavouritePokemon}
								removeFavouritePokemon={this.removeFavouritePokemon}
							/>
						))}
					{/* Page Favoris */}
					{this.state.view === 2 &&
						this.state.likedPokemons &&
						this.state.likedPokemons.map((pokemon) => (
							<TileFavourite
								likedPokemons={this.state.likedPokemons}
								key={pokemon.name}
								data={pokemon}
								addFavouritePokemon={this.addFavouritePokemon}
								removeFavouritePokemon={this.removeFavouritePokemon}
							/>
						))}
					{/* Page Favoris si l'utilisateur n'a pas encore mis de Pokemon en favori */}
					{this.state.view === 2 &&
					this.state.likedPokemons.length === 0 && (
						<h1 className="no-fav-yet">Sorry, you have no favourite Pokemon yet.</h1>
					)}
				</div>
				{this.state.view === 1 && (
					<Pagination
						data={this.state}
						handlePreviousClick={this.handlePreviousClick}
						handleNextClick={this.handleNextClick}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokemons
	};
};

const mapDispatchToProps = (dispatch) => {
	return { getPokemons: () => dispatch(getPokemons()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
