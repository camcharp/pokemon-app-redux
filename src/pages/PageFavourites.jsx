import React, { Component } from 'react'

// redux
import { connect } from 'react-redux';

class PageFavourites extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	const { likedPokemons } = state;
	return { likedPokemons };
};

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageFavourites);