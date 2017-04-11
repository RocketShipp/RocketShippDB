import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpSignIn from './SignUpSignIn';
import Movies from './Movies';
import RocketFaves from './RocketFaves';
import Profile from './Profile';
import axios from 'axios';
import {Link} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      signUpSignInError: '',
      authenticated: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    };

  }
  renderSignUpSignIn() {
    return (
      <SignUpSignIn
        error={this.state.signUpSignInError}
        onSignUp={this.handleSignUp.bind(this)}
        onSignIn={this.handleSignIn.bind(this)}
      />
    );
  }
  notFound() {
    return (
      <div className="col-xs-12 flexBoxCenterThis noMovies animated flipInY">
        <h1>404</h1>
        <p>{'Sorry, this page does\'t exist!'}</p>
        <div>
          <Link className="linkTo" to={'/'}>Get me outta here!</Link>
        </div>
      </div>
    );
  }
  renderApp() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" render={() => <Movies handleSignOut={this.handleSignOut.bind(this)}/>} />
          <Route exact path={'/profile/:id'} component={Profile} />
          <Route exact path="/rocketfaves" component={RocketFaves} />
          <Route render={() => this.notFound()} />
        </Switch>
      </div>
    );
  }
  handleSignUp(credentials) {
    const { username, password, confirmPassword} = credentials;
    if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
      this.setstate({
        sinUpSignInError: 'Must Provide All Fields!'
      });
    } else {
      axios.post('/signup', credentials)
        .then(resp => {
          const { token, userId } = resp.data;

          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          this.setState({
            signUpSignInError: '',
            authenticated: token,
            userId: userId
          });
        })
        .catch(err => console.log(err));
    }
  }
  handleSignIn(credentials) {
    const {username, password} = credentials;
    if (!username.trim() || !password.trim()) {
      this.setState({
        signUpSignInError: 'Must provide username and password'
      });
    } else {
      axios.post('/signin', credentials)
        .then(resp => {
          const {token, userId} = resp.data;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          this.setState({
            signUpSignInError: '',
            authenticated: token,
            userId: userId
          });
        });
    }

  }
  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false,
      userId: null
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="router">
          {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
