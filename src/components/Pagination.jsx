import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNewPokemons } from '../actions/boardActions';

class Pagination extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="center">
					<div className="pagination">
						<button className="previous" onClick={() => this.props.getNewPokemons(this.props.previous)}>
							&laquo; Previous Pokemons
						</button>
						<button className="next" onClick={() => this.props.getNewPokemons(this.props.next)}>
							Next Pokemons &raquo;
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokemons,
		likedPokemons: state.likedPokemons,
		previous: state.previous,
		next: state.next
	};
};

const mapDispatchToProps = (dispatch) => {
	return { getNewPokemons: (url) => dispatch(getNewPokemons(url)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
