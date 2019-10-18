import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { likePokemon, dislikePokemon } from '../actions/actions';

// axios
import axios from 'axios';

class Tile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: [],
			frontCard: true,
			liked: false, // mis en favori ?
			cardClasses: [ 'card' ]
		};
	}

	// vérifier si le Pokemon a été mis en favori
	checkIfPokemonIsLiked(pokemon) {
		if (
			this.props.likedPokemons.find((p) => {
				return p.name === pokemon.name;
			})
		)
			this.setState({ liked: true });
	}

	// ajouter une classe quand la carte est retournée, pour l'effet
	flipCard = () => {
		this.setState({ frontCard: !this.state.frontCard });
		if (this.state.frontCard === true) this.setState({ cardClasses: [ 'card', 'flipped' ] });
		else this.setState({ cardClasses: [ 'card' ] });
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

	addFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		const likedPokemonsCopy = [ ...this.props.likedPokemons ];
		if (!this.props.likedPokemons.some((p) => p.name === pokemon.name)) {
			likedPokemonsCopy.push(pokemon);
			this.props.likePokemon(pokemon, likedPokemonsCopy);
		}
	};

	removeFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		this.props.dislikePokemon(pokemon);
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
			<div>
				<div className="card-plus-heart">
					{this.state.liked ? ( // coeur différent si le Pokemon est en favori ou non
						<i className="fa fa-heart fa-sm" onClick={this.handleFavourite} />
					) : (
						<i className="fa fa-heart-o fa-sm" onClick={this.handleFavourite} />
					)}

					<div className={cardClasses} onClick={this.flipCard}>
						{pokemon.sprites && // vérifier que toutes les infos soient chargées
						pokemon.types &&
						pokemon.stats &&
						pokemon.moves ? (
							this.state.frontCard && (
								<div className="face front">
									{pokemon.sprites.front_default ? (
										<img src={pokemon.sprites.front_default} className='icon' alt="pokemon-sprite-front" />
									) : <img src={'pokeball.png'} className='icon-default icon-small' alt="pokemon-sprite-front" />}
									<h1 className="pokemon-name">{pokemon.name}</h1>
									<p className="pokemon-type">{pokemon.types[0].type.name} </p>
									<div className="pokemon-stats" />
								</div>
							)
						) : (
							<h2>Wild Pokemon {pokemon.name} approching...</h2>
						)}
						{/* carte vue de dos */}
						{!this.state.frontCard && (
							<div className="face back">
								<div className="img-back">
									{pokemon.sprites.front_default ? (
										<img src={pokemon.sprites.front_default} alt="pokemon-sprite-front" />
									) : null}
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
	return {
		likePokemon: (pokemon, newLikedPokemons) => dispatch(likePokemon(pokemon, newLikedPokemons)),
		dislikePokemon: (pokemon) => dispatch(dislikePokemon(pokemon))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
