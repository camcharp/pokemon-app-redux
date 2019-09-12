import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { getNewPokemons } from '../actions/actions';

class Pagination extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="center">
					<div className="pagination">
						{this.props.previous ? (
							<button
								className="pagination-btn previous"
								onClick={() => this.props.getNewPokemons(this.props.previous)}
							>
								&laquo; Previous Pokemons
							</button>
						) : null}
						{this.props.next ? (
							<button
								className="pagination-btn next"
								onClick={() => this.props.getNewPokemons(this.props.next)}
							>
								Next Pokemons &raquo;
							</button>
						) : null}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		previous: state.previous,
		next: state.next
	};
};

const mapDispatchToProps = (dispatch) => {
	return { getNewPokemons: (url) => dispatch(getNewPokemons(url)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
