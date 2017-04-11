import React from 'react';
import {Link} from 'react-router-dom';

const Movie = props => {
  function rocketFavText(id) {
    // Toggle the text of RocketFave section if that movie is a savedMovie or not
    const savedMovieIdArr = (props.savedMovies.map(savedMovie => {
      return savedMovie.id;
    }));
    if (savedMovieIdArr.indexOf(id) >= 0) {
      return 'Remove RocketFave';
    }

    return 'Add to RocketFaves';
  }
  function checkLengthAndRender() {
    // If there are movies in the App.js movie state, then map over them
    if (props.movies.length) {
      return (
        props.movies.map((movieResult, index) => {
          return (
            <div
              key={index}
              className="col-xs-12 col-sm-6 col-lg-3 movieColumn animated fadeInUp"
            >
              <div className="movieColumnContents flexBoxCenterThis">
                <div id="movieTitle" className="flexBoxCenterThis">
                  <h3>{movieResult.original_title || movieResult.originalTitle}</h3>
                </div>
                <div id="posterContainer" className="flexBoxCenterThis">
                  <Link to={`/profile/${movieResult.id}`} className="flexBoxCenterThis linkTo">
                    <img
                      className="posterImg animated fadeIn"
                      onError={(event) => (event.target.src = 'http://i.imgur.com/40NGAaC.png')}
                      alt={movieResult.title}
                      src={`https://image.tmdb.org/t/p/w154/${movieResult.poster_path ||
                        movieResult.posterPath}`}
                    />
                  </Link>
                </div>
                <div id="movieInfo">
                  <p><strong>Overview:</strong></p>
                  <p>{movieResult.overview}</p>
                  <hr />
                  <p><strong><u>Release:</u></strong>
                    {' ' + (movieResult.release_date || movieResult.releaseDate || 'N/A')}</p>
                  <p><strong><u>Vote Average:</u></strong>
                    {' ' + (movieResult.vote_average || movieResult.voteAverage || '0')}</p>
                  <p><strong><u>Vote Count:</u></strong>
                    {' ' + (movieResult.vote_count || movieResult.voteCount || '0')}</p>
                </div>
                <div id="saveMovie">
                  <button
                    className="fa fa-rocket"
                    aria-hidden="false"
                    onClick={(event) => props.rocketFaveHandle(event, movieResult.id)}
                  />
                  <a
                    id="hiddenSaveText"
                    href="#"
                    className="animated flipInX"
                    onClick={(event) => props.rocketFaveHandle(event, movieResult.id)}>
                    {rocketFavText(movieResult.id)}
                  </a>
                </div>
              </div>
            </div>
          );
        })
      );}
    // If there are no movies in the movie state, return this placeholder div
    return (
      <div className="col-xs-12 noMovies animated flipInY">
        <h1>(o_o)</h1>
        <p>One sec, looking...</p>
      </div>
    );
  }
  return (
    <div className="row columnsContainer">
      {checkLengthAndRender()}
    </div>
  );
};
Movie.propTypes = {
  movies: React.PropTypes.array.isRequired,
  savedMovies: React.PropTypes.array.isRequired,
  onError: React.PropTypes.func.isRequired,
  rocketFaveHandle: React.PropTypes.func.isRequired
};
export default Movie;
