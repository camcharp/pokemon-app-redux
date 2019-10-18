import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { getPokemons } from '../actions/actions';

// components
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Tile from '../components/Tile';
// import TileFavourite from '../components/TileFavourite';

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
			<React.Fragment>
				<div className="page-wrapper">
				<Header />
					<SearchBar />
					<Pagination/>
					<div className="big-container">
						{!this.props.pokemons.length && <h1>Chasing the Pokemons, please wait...</h1>}
						{/* Quand l'utilisateur tape dans la SearchBar */}
						{this.props.searchField &&
							this._isMounted &&
							filteredPokemons.map((pokemon) => (
								<Tile likedPokemons={this.props.likedPokemons} key={pokemon.url} data={pokemon} />
							))}
						{/* Sans recherche dans la SearchBar */}
						{this.props.pokemons &&
							!this.props.searchField &&
							this.props.pokemons.map((pokemon) => (
								<Tile likedPokemons={this.props.likedPokemons} key={pokemon.url} data={pokemon} />
							))}						
					</div>
					<Pagination />
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	const { pokemons, likedPokemons, allPokemons, searchField } = state;
	return { pokemons, likedPokemons, allPokemons, searchField };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemons: () => dispatch(getPokemons())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
