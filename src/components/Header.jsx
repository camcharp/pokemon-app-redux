import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { goToPagePokemons, goToPageFavourites } from '../actions/actions';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<NavLink to="/" onClick={this.props.goToPagePokemons}>
					<h2>Pokemons</h2>
				</NavLink>
				<NavLink to="/fav" onClick={this.props.goToPageFavourites}>
					<h2>Your favourites</h2>
				</NavLink>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		view: state.view
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		goToPagePokemons: () => dispatch(goToPagePokemons()),
		goToPageFavourites: () => dispatch(goToPageFavourites())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
