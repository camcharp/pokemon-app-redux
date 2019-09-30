import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { getNewPokemons } from '../actions/actions';

class Pagination2 extends Component {
	render() {
		return (
			<div className="center">
				<div className="pagination">
					{!this.props.searchField && this.props.view === 1 && this.props.previous ? (
						<button
							className="pagination-btn previous"
							onClick={() => this.props.getNewPokemons(this.props.previous)}
						>
							&laquo; Previous Pokemons
						</button>
					) : null}
					{!this.props.searchField && this.props.view === 1 && this.props.next ? (
						<button
							className="pagination-btn next"
							onClick={() => this.props.getNewPokemons(this.props.next)}
						>
							Next Pokemons &raquo;
						</button>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { pokemons, previous, next, searchField, view } = state;
	return { pokemons, previous, next, searchField, view };
};

const mapDispatchToProps = (dispatch) => {
	return { getNewPokemons: (url) => dispatch(getNewPokemons(url)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination2);
