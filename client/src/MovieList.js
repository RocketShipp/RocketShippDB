import React from 'react';
import Movie from './Movie';

const MovieList = props => {
  return (
    <div id="row mainContainerRow">
      <div id="row resultMovieRow">
        <Movie
          movies={props.movies}
          savedMovies={props.savedMovies}
          onError={props.onError}
          rocketFaveHandle={props.rocketFaveHandle}
        />
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: React.PropTypes.array.isRequired,
  savedMovies: React.PropTypes.array.isRequired,
  onError: React.PropTypes.func.isRequired,
  rocketFaveHandle: React.PropTypes.func.isRequired
};
export default MovieList;
