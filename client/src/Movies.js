import React, { Component } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import Footer from './Footer';

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      savedMovies: [],
      searchText: '',
      userName: '',
      page: 1,
      showPageNumbers: true
    };
  }
  componentDidMount() {
    this.getSavedMovies();
    this.getPopularMovies();
    this.getUserName();
  }
  getUserName() {
    axios.get('/rocketfaves', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(resp => {
      const capitalizedUserName = resp.data.charAt(0).toUpperCase() + resp.data.slice(1);
      this.setState({
        userName: capitalizedUserName
      });
    })
    .catch(err => console.log(err));
  }
  getSavedMovies() {
    axios.get(`/rocketfaves/${localStorage.getItem('userId')}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(resp => {
        this.setState({ savedMovies: resp.data[0].items });
      });
  }
  getPopularMovies() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=2dba200e2682e0f8903ed87b9c9e02d1&language=en-US&page=1')
      .then(resp => {
        this.setState({ movies: resp.data.results, showPageNumbers: true });
      });
  }
  getThisPopularPage(event) {
    event.preventDefault();
    const nextPage = this.state.page + 1;
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2dba200e2682e0f8903ed87b9c9e02d1&language=en-US&page=${nextPage}`)
      .then(resp => {
        const newList = (this.state.movies.concat(resp.data.results));
        this.setState({ movies: newList, page: nextPage });
      });
  }
  nextPageButton() {
    
    return (
      <div className="row">
        <div className="col-xs-12 flexBoxCenterThis" id="nextPageButtonContainer">
          <button onClick={(event) => this.getThisPopularPage(event)}>Next Page</button>
        </div>
      </div>
    );
  }
  handleSearchBarChange(event) {
    this.setState({ searchText: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2dba200e2682e0f8903ed87b9c9e02d1&language=en-US&query=${this.state.searchText}&page=1&include_adult=false`)
      .then(resp => {
        this.setState({ movies: resp.data.results, page: 1, showPageNumbers: false });
      })
      .catch(err => {
        console.err(`Error ${err}`);
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
    const savedMovieIdArr = (this.state.savedMovies.map(savedMovie => {
      return savedMovie.id;
    }));
    if (savedMovieIdArr.indexOf(id) >= 0) {
      // This movie ID exists in my saved movies ID array, so DELETE it from my db
      axios.delete(`/rocketfaves/${localStorage.getItem('userId')}/item/${this.state.savedMovies[savedMovieIdArr.indexOf(id)]._id}`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
          .then(resp => {
            // Remove movie object from saved movie state
            this.setState({
              savedMovies: resp.data.items
            });
          });
    } else {
      // This movie ID is not in my saved movies ID array, so POST it to my db
      axios.post(`/rocketfaves/${localStorage.getItem('userId')}`, (this.state.movies[movieIdArr.indexOf(id)]), {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
          .then(resp => {
            // Concat movie object to savedMovies state
            this.setState({
              savedMovies: resp.data.items
            });
          });
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          name="searchBar"
          value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)}
          getPopularMovies={this.getPopularMovies.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          handleSignOut={this.props.handleSignOut}
          userName={this.state.userName}
        />
        <MovieList
          movies={this.state.movies}
          savedMovies={this.state.savedMovies}
          onError={this.handleImgError.bind(this)}
          rocketFaveHandle={this.rocketFaveHandle.bind(this)}
        />
        { this.state.showPageNumbers ? this.nextPageButton() : null }
        <Footer/>
      </div>
    );
  }
}

export default Movies;
