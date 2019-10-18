import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
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
