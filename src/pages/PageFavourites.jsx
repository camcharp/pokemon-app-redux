import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// components
import Header from '../components/Header';
import Tile from '../components/TileFavourite';

class PageFavourites extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<div id="liked-pokemons-container">
					{this.props.likedPokemons &&
						this.props.likedPokemons.map((pokemon) => <Tile key={pokemon.name} data={pokemon} />)}
					{!this.props.likedPokemons.length && (
						<h1 className="no-fav-yet">Sorry, you have no favourite Pokemon yet.</h1>
					)}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	const { likedPokemons } = state;
	return { likedPokemons };
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageFavourites);
