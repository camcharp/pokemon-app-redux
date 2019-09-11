import React, { Component } from 'react';
import axios from 'axios';

// redux
import { connect } from 'react-redux';
import { likePokemon } from '../actions/actions';

class Tile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: [], // Pokemon de la carte
			frontCard: true,
			liked: false, // mis en favori ?
			cardClasses: [ 'card' ]
		};
		this.flipCard = this.flipCard.bind(this);
		this.handleFavourite = this.handleFavourite.bind(this);
	}

	// vérifier si le Pokemon a été mis en favori
	checkIfPokemonIsLiked(pokemon) {
		const pokemonsFavourited = this.props.likedPokemons;
		if (
			pokemonsFavourited.find((poke) => {
				return poke.name === pokemon.name;
			})
		)
			this.setState({ liked: true });
	}

	// ajouter une classe quand la carte est retournée, pour l'effet
	flipCard() {
		this.setState({ frontCard: !this.state.frontCard });
		if (this.state.frontCard === true) this.setState({ cardClasses: [ 'card', 'flipped' ] });
		else this.setState({ cardClasses: [ 'card' ] });
	}

	// addFavouritePokemon = (e, pokemon) => {
	// 	e.preventDefault();
	// 	const likedPokemonsCopy = [ ...this.state.likedPokemons ];
	// 	if (!likedPokemonsCopy.some((p) => p.name === pokemon.name)) likedPokemonsCopy.push(pokemon);
	// 	this.setState({ likedPokemons: likedPokemonsCopy });
	// };

	addFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		const likedPokemonsCopy = [ ...this.props.likedPokemons ];
		if (!this.props.likedPokemons.some((p) => p.name === pokemon.name)) {
			likedPokemonsCopy.push(pokemon);
			console.log(likedPokemonsCopy);
			this.props.likePokemon(pokemon, likedPokemonsCopy);
		}
	};

	removeFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		let likedPokemonsCopy = [ ...this.state.likedPokemons ];
		for (let i = 0; i < likedPokemonsCopy.length; i++) {
			if (likedPokemonsCopy[i].name === pokemon.name) {
				likedPokemonsCopy.splice(likedPokemonsCopy[i], 1);
			}
		}
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	// ajouter/enlèver le statut "favori"
	handleFavourite = (e) => {
		if (this.state.liked) {
			this.removeFavouritePokemon(e, this.state.pokemon);
			this.setState({ liked: false });
		} else {
			this.addFavouritePokemon(e, this.state.pokemon);
			if (!this.state.liked) this.setState({ liked: true });
		}
	};

	componentDidMount() {
		axios.get(`${this.props.data.url}`).then((res) => {
			this.setState({ pokemon: res.data });
			this.checkIfPokemonIsLiked(this.state.pokemon);
		});
	}

	render() {
		const pokemon = this.state.pokemon;
		let cardClasses = this.state.cardClasses.join(' ');
		return (
			<div className="card-plus-heart">
				{/* coeur différent si le Pokemon est en favori ou non */}
				{this.state.liked ? (
					<i className="fa fa-heart fa-sm" onClick={this.handleFavourite} />
				) : (
					<i className="fa fa-heart-o fa-sm" onClick={this.handleFavourite} />
				)}

				<div className={cardClasses} onClick={this.flipCard}>
					{/* vérifier que toutes les infos soient chargées */}
					{pokemon.sprites &&
					pokemon.types &&
					pokemon.stats &&
					pokemon.moves &&
					this.state.frontCard && (
						<div className="face front">
							<img src={pokemon.sprites.front_default} alt="pokemon-sprite" />
							<h1 className="pokemon-name">{pokemon.name}</h1>
							<p className="pokemon-type">{pokemon.types[0].type.name} </p>
							<div className="pokemon-stats" />
						</div>
					)}
					{/* carte vue de dos */}
					{!this.state.frontCard && (
						<div className="face back">
							<div className="img-back">
								<img src={pokemon.sprites.front_default} alt="pokemon-sprite" />
								{pokemon.sprites.back_default ? (
									<img src={pokemon.sprites.back_default} alt="pokemon-sprite-back" />
								) : null}
							</div>
							<h1 className="pokemon-name">{pokemon.name}</h1>
							<p className="pokemon-type">{pokemon.types[0].type.name} </p>
							<div className="pokemon-stats">
								{pokemon.stats.map((stat) => (
									<div className="stats-name" key={stat.stat.name}>
										<p>{stat.stat.name}</p> <p className="stats-base">{stat.base_stat}</p>
									</div>
								))}
							</div>
							<div className="pokemon-move">
								<p className="move">special move: {pokemon.moves[0].move.name}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokemons,
		likedPokemon: state.likedPokemon
	};
};

const mapDispatchToProps = (dispatch) => {
	return { likePokemon: (pokemon, newLikedPokemons) => dispatch(likePokemon(pokemon, newLikedPokemons)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
