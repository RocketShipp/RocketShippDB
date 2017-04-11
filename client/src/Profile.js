import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';


class Profile extends Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      savedMovies: [],
      isFave: null,
      cast: null,
      trailers: null
    };
  }
  componentDidMount() {
    axios.get(`/rocketfaves/${localStorage.getItem('userId')}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState({
          savedMovies: resp.data[0].items
        });
      });
    axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=2dba200e2682e0f8903ed87b9c9e02d1&language=en-US`)
      .then(resp => {
        this.setState({
          movie: resp.data
        });
      })
      .catch(err => console.log(`Error ${err}`));
    axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=2dba200e2682e0f8903ed87b9c9e02d1&language=en-US`)
      .then(resp => {
        this.setState({
          trailers: resp.data.results
        });
      })
      .catch(err => console.log(`Error ${err}`));
      axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=2dba200e2682e0f8903ed87b9c9e02d1`)
        .then(resp => {
          this.setState({
            cast: resp.data.cast
          });
        })
        .catch(err => console.log(`Error ${err}`));
  }
  rocketFaveText() {
    const savedMovieIdArr = this.state.savedMovies.map(movie => movie.id);
    switch (this.state.isFave) {
      case true:
        return 'Added to RocketFaves!';
      case false:
        return 'Removed from RocketFaves!';
      default:
        return (savedMovieIdArr.indexOf(this.state.movie.id) >= 0) ?
          'Remove RocketFave' : 'Add to RocketFaves';
    }
  }
  rocketFaveHandle(event, id) {
    event.preventDefault();
    const savedMovieIdArr = this.state.savedMovies.map(movie => movie.id);
    if (this.rocketFaveText() === 'Add to RocketFaves') {
      axios.post(`/rocketfaves/${localStorage.getItem('userId')}`, this.state.movie, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(resp => {
          this.setState({
            isFave: true
          });
        });
    } else if (this.rocketFaveText() === 'Remove RocketFave') {
      axios.delete(`/rocketfaves/${localStorage.getItem('userId')}/item/${this.state.savedMovies[savedMovieIdArr.indexOf(id)]._id}`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(resp => {
        this.setState({
          isFave: false
        });
      });
    }
  }
  getallGenres() {
    let allGenres = [];
    this.state.movie.genres.forEach(genre => {
      allGenres = [...allGenres, genre.name];
    });
    if (allGenres.length === 0) {
      return 'No genre data';
    } else if (allGenres.length === 1) {
      return allGenres[0];
    } else if (allGenres.length === 2) {
      const twoGenres = `${allGenres[0]}, ${allGenres[1]}`;
      return twoGenres;
    }
    const threeGenres = `${allGenres[0]}, ${allGenres[1]}, ${allGenres[2]}`;
    return threeGenres;
  }
  refactorMoney(money) {
    if (money.toString() === '0') {
      return 'No Data';
    }
    let moneyBaby = money;
    while (/(\d+)(\d{3})/.test(moneyBaby.toString())) {
      moneyBaby = moneyBaby.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return `$ ${moneyBaby}`;
  }
  refactorDate() {
    const oldDate = this.state.movie.release_date.split('-');
    const year = oldDate[0];
    const month = oldDate[1];
    const day = oldDate[2];

    let wordMonth = '';

    if (month === '01') {
      wordMonth = 'January';
    } else if (month === '02') {
      wordMonth = 'February';
    } else if (month === '03') {
      wordMonth = 'March';
    } else if (month === '04') {
      wordMonth = 'April';
    } else if (month === '05') {
      wordMonth = 'May';
    } else if (month === '06') {
      wordMonth = 'June';
    } else if (month === '07') {
      wordMonth = 'July';
    } else if (month === '08') {
      wordMonth = 'August';
    } else if (month === '09') {
      wordMonth = 'September';
    } else if (month === '10') {
      wordMonth = 'October';
    } else if (month === '11') {
      wordMonth = 'November';
    } else if (month === '12') {
      wordMonth = 'December';
    }

    const newDate = (`${wordMonth} ${day}, ${year}`);
    if (this.state.movie.release_date) {
      return newDate;
    }
    return 'Date unavailable';
  }
  checkTagline() {
    if (this.state.movie.tagline === '') {
      return (this.state.movie.original_title);
    }
    return this.state.movie.tagline;
  }
  renderProfile() {
    return (
      <div className="row" id="profileRow">
        <div className="header row animated fadeIn" id="profileHeader">
          <div className="col-xs-12">
            <h1><Link className="linkTo" to={'/'}>RocketShippDB</Link></h1>
            <Link className="linkTo" to={'/rocketfaves'} >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Go to RocketFaves</Tooltip>}
              >
                <i
                  className="fa fa-rocket"
                  aria-hidden="false"
                />
              </OverlayTrigger>
            </Link>
          </div>
        </div>
        <div className="profileContents animated fadeIn">
          <div className="col-xs-12 col-md-4 profileColumn" id="leftProfileColumn">
            <div className="profilePosterContainer flexBoxCenterThis">
              <button id="profileMoviePosterButton" onClick={(event) => event.preventDefault()}>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="trailerTooltip">Watch Trailers</Tooltip>}
                >
                  <img
                    id="profilePosterImg"
                    data-toggle="modal"
                    data-target="#trailer-modal"
                    alt="Poster"
                    className="img-responsive"
                    src={`https://image.tmdb.org/t/p/w300/${this.state.movie.poster_path}`}
                    onError={(event) => (event.target.src = 'http://i.imgur.com/40NGAaC.png')}
                  />
                </OverlayTrigger>
              </button>
            </div>
            <div className="profileDetails flexBoxCenterThis">
              <p>{this.refactorDate()}</p>
              <p>{this.state.movie.runtime} minutes</p>
              <p>{this.getallGenres()}</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-8 profileColumn" id="rightProfileColumn">
            <div className="profileTagline">
              <h3>{this.checkTagline()}</h3>
            </div>
            <div className="profileOverviewContainer flexBoxCenterThis">
              <div className="profileOverview">
                <div className="profileMovieTitle">
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="castTooltip">View Cast</Tooltip>}
                  >
                    <button
                      data-toggle="modal"
                      data-target="#cast-modal"
                    >
                      {this.state.movie.original_title}
                    </button>
                  </OverlayTrigger>
                </div>
                <hr />
                <p>{this.state.movie.overview}</p>
                <hr />
                <div className="profileRocketFave">
                  <button
                    id="profileRocketFaveButton"
                    onClick={(event) => this.rocketFaveHandle(event, this.state.movie.id)}
                  >
                    {this.rocketFaveText()}
                  </button>
                </div>
              </div>
            </div>
            <div className="profileStats">
              <p><span>Vote Average:</span> {this.state.movie.vote_average}</p>
              <p><span>Vote Count:</span> {this.state.movie.vote_count}</p>
              <p><span>Budget:</span> {this.refactorMoney(this.state.movie.budget)}</p>
              <p><span>Revenue:</span> {this.refactorMoney(this.state.movie.revenue)}</p>
            </div>
          </div>
        </div>
        <div className="modal fade"
          id="trailer-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.trailers.map(trailer => {
                  if (trailer.site === 'YouTube') {
                    return <iframe key={trailer.id} width="100%" height="480" src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" allowFullScreen />;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade"
          id="cast-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul id="castList">
                <p id="castModalHeader">Cast of {this.state.movie.original_title}</p>
                <hr />
                  {this.state.cast.map(person => {
                    return <li key={person.id}><h3><span id="actor">{person.name}</span> as {person.character}</h3></li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (!this.state.movie) {
      return (
        <div>
          <div className="row" id="profileRow">
            <div className="header row animated fadeIn" id="profileHeader">
              <div className="col-xs-12">
                <h1><Link className="linkTo" to={'/'}>RocketShippDB</Link></h1>
                <Link className="linkTo" to={'/rocketfaves'} >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Go to RocketFaves</Tooltip>}
                  >
                    <i
                      className="fa fa-rocket"
                      aria-hidden="false"
                    />
                  </OverlayTrigger>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 flexBoxCenterThis noMovies animated flipInY">
            <h1>(*-*)</h1>
            <p>{'Looking for that movie...'}</p>
            <div>
              <Link className="linkTo" to={'/'}>Get me outta here!</Link>
            </div>
          </div>
        </div>
      );
    }
    return this.renderProfile();
  }
}

export default Profile;
