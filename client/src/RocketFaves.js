import React, { Component } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import {Link} from 'react-router-dom';

class RocketFaves extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      userId: localStorage.getItem('userId')
    };
  }

  componentDidMount() {
    axios.get(`/rocketfaves/${this.state.userId}`)
    .then(resp => {
      this.setState({
        movies: resp.data[0].items
      });
    });
  }

  handleImgError(event) {
    event.target.src = 'http://i.imgur.com/40NGAaC.png';
  }
  rocketFaveHandle(event, id) {
    event.preventDefault();
    const movieIdArr = (this.state.movies.map(movieItem => {
      return movieItem.id;
    }));
    if (movieIdArr.indexOf(id) >= 0) {
      // This movie ID exists in my saved movies ID array, so DELETE it from my db
      axios.delete(`/rocketfaves/${localStorage.getItem('userId')}/item/${this.state.movies[movieIdArr.indexOf(id)]._id}`)
          .then(resp => {
            // Remove movie object from both states (from the page and savedMovies)
            const newMovies = this.state.movies.filter(movie => movie.id !==
              this.state.movies[movieIdArr.indexOf(id)].id);
            this.setState({
              movies: newMovies
            });
          });
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row" id="profileRow">
          <div className="header row animated slideInDown" id="rocketFaveHeader">
            <div className="col-xs-12 flexBoxCenterThis">
              <h1><Link className="linkTo" to={'/'}>RocketShippDB</Link></h1>
              <i
                className="fa fa-rocket favesRocket"
                aria-hidden="false"
              />
            </div>
          </div>
        </div>
        <div>
          <MovieList
            movies={this.state.movies}
            savedMovies={this.state.movies}
            onError={this.handleImgError.bind(this)}
            rocketFaveHandle={this.rocketFaveHandle.bind(this)}
           />
        </div>
      </div>
    );
  }
}

export default RocketFaves;
