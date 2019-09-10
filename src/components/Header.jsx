import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<NavLink to="/" /*onClick={this.props.getNextPokemons}*/>
					<h2>Pokemons</h2>
				</NavLink>
				<NavLink to="/fav" /*onClick={this.props.getNextPokemons(this.props.next)}*/>
					<h2>Your favourites</h2>
				</NavLink>
			</div>
		);
	}
}


export default Header;
