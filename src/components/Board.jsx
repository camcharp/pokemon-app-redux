import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { getPokemons } from '../actions/actions';

// components
import Header from './Header';
import Pagination from './Pagination';
import Tile from './Tile';
import TileFavourite from './TileFavourite';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			likedPokemons: []
		};
	}

	componentDidMount() {
		this.props.getPokemons();
	}

	render() {
		return (
			<div className="page-wrapper">
				<Header />
				{this.props.view === 1 && this.props.pokemons && <Pagination />}
				<div className="big-container">
					{/* Page Pokemons */}
					{this.props.view === 1 &&
						this.props.pokemons &&
						this.props.pokemons.map((pokemon) => (
							<Tile
								likedPokemons={this.props.likedPokemons}
								key={pokemon.url}
								data={pokemon}
								addFavouritePokemon={this.addFavouritePokemon}
								removeFavouritePokemon={this.removeFavouritePokemon}
							/>
						))}
					{/* Page Favoris */}
					{this.props.view === 2 &&
						this.props.likedPokemons &&
						this.props.likedPokemons.map((pokemon) => (
							<TileFavourite
								likedPokemons={this.props.likedPokemons}
								key={pokemon.name}
								data={pokemon}
								addFavouritePokemon={this.addFavouritePokemon}
								removeFavouritePokemon={this.removeFavouritePokemon}
							/>
						))}
					{/* Page Favoris si l'utilisateur n'a pas encore mis de Pokemon en favori */}
					{this.props.view === 2 &&
					this.props.likedPokemons.length === 0 && (
						<h1 className="no-fav-yet">Sorry, you have no favourite Pokemon yet.</h1>
					)}
				</div>
				{this.props.view === 1 && <Pagination />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokemons,
		likedPokemons: state.likedPokemons,
		view: state.view
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemons: () => dispatch(getPokemons())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
