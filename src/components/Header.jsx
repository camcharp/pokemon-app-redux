import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { goToPagePokemons, goToPageFavourites } from '../actions/actions';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<NavLink exact to="/" className="navlink" activeClassName="navlink-active">
					Pokemons
				</NavLink>
				<NavLink to="/fav" className="navlink" activeClassName="navlink-active">
					Your favourites
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
