import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { searchPokemon } from '../actions/actions';

class SearchBar extends Component {
	isStringEmpty = (str) => {
		return str.length === 0 || !str.trim();
	};

	handleChange = (evt) => {
		let isEmpty = this.isStringEmpty(evt.target.value);
		console.log('lala ' + isEmpty);
		this.props.searchPokemon(evt.target.value);
	};

	render() {
		return (
			<div id="search-container">
				<div className="searchBar">
					<p>Looking for a Pokemon? Type its name!</p>
					<input
						type="text"
						onChange={this.handleChange}
						placeholder="type a pokemon name"
						value={this.props.searchField}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokemons,
		searchField: state.searchField
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchPokemon: (input) => dispatch(searchPokemon(input))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
