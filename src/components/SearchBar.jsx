import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { searchPokemon } from '../actions/actions';

class SearchBar extends Component {
	handleChange = (evt) => {
		this.props.searchPokemon(evt.target.value);
	};

	render() {
		return (
			<div>
				<div className="SearchBar">
					<p>Search</p>
					<input type="text" onChange={this.handleChange} placeholder="type a pokemon name" />
				</div>
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
	return {
		searchPokemon: (input) => dispatch(searchPokemon(input))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
