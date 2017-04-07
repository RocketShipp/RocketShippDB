import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const SearchBar = props => {
  return (
    <div className="row header animated slideInDown">
      <div className="col-xs-12">
        <div className="signOutRow">
          <button onClick={props.handleSignOut}>Sign Out of {props.userName}</button>
        </div>
        <h1 onClick={() => props.getPopularMovies()}>
          <Link className="linkTo" to={'/'}>RocketShippDB</Link>
        </h1>
        <Link className="linkTo" to={'/rocketfaves'}>
          <i
            className="fa fa-rocket"
            aria-hidden="false"
            data-toggle="tooltip" data-placement="right" title="RocketFaves"
          />
        </Link>
        <br />
        <form onSubmit={(event) => props.handleSubmit(event)}>
          <input
            type="text"
            onChange={(event) => props.onChange(event)}
            className="searchBar" />
          <button type="submit" id="searchSubmit">Search</button>
        </form>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  getPopularMovies: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};
export default SearchBar;
