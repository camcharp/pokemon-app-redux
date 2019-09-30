import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { getPokemons } from '../actions/actions';

// components
import Header from './Header';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Tile from './Tile';
import TileFavourite from './TileFavourite';

class Board extends Component {
	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;
		this.props.getPokemons();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		// console.log(!this.props.searchField || /^\s*$/.test(this.props.searchField));

		let filteredPokemons = [];
		this.props.allPokemons
			? (filteredPokemons = this.props.allPokemons.filter((pokemon) =>
					pokemon.name.includes(this.props.searchField)
				))
			: (filteredPokemons = []);

		// let pagination;
		// if (!this.props.searchField.length || !this.props.searchField.trim()) {
		// 	pagination = <Pagination />;
		// } else {
		// 	pagination = <h1>researching...</h1>;
		// }

		return (
			<div className="page-wrapper">
				<Header />
				<SearchBar />
				{this.props.view === 1 && <Pagination />}
				<div className="big-container">
					{/* Page Pokemons */}
					{!this.props.pokemons.length && <h1>Chasing the Pokemons, please wait...</h1>}
					{/* Page Pokemons quand l'utilisateur tape dans la SearchBar */}
					{this.props.searchField &&
						this._isMounted &&
						filteredPokemons.map((pokemon) => (
							<Tile likedPokemons={this.props.likedPokemons} key={pokemon.url} data={pokemon} />
						))}
					{/* Page Pokemons sans recherche dans la SearchBar */}
					{this.props.view === 1 &&
						this.props.pokemons &&
						!this.props.searchField &&
						this.props.pokemons.map((pokemon) => (
							<Tile likedPokemons={this.props.likedPokemons} key={pokemon.url} data={pokemon} />
						))}
					{/* Page Favoris */}
					{this.props.view === 2 &&
						this.props.likedPokemons &&
						this.props.likedPokemons.map((pokemon) => <TileFavourite key={pokemon.name} data={pokemon} />)}
					{/* Page Favoris si l'utilisateur n'a pas encore mis de Pokemon en favori */}
					{this.props.view === 2 &&
					!this.props.likedPokemons.length && (
						<h1 className="no-fav-yet">Sorry, you have no favourite Pokemon yet.</h1>
					)}
				</div>
				{this.props.view === 1 && <Pagination />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { pokemons, likedPokemons, allPokemons, view, searchField } = state;
	return { pokemons, likedPokemons, allPokemons, view, searchField };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemons: () => dispatch(getPokemons())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
