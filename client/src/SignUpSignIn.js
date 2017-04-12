import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, Row, Col, Alert } from 'react-bootstrap';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class SignUpSignIn extends Component {

  renderError() {
    return (
      <Alert bsStyle="danger">
        <strong>{this.props.error}</strong>
      </Alert>
    );
  }

  render() {
    return (
      <div className="sinUpSignInRowContainer">
        <Row>
          <Col className="signUpSignInLogo" xs={12}>
            <h1>RocketShippDB</h1>
            <i
              className="fa fa-rocket"
              aria-hidden="false"
            />
          </Col>
        </Row>
        <Row className="formsRow">
          <Col xs={12} sm={8} smOffset={2}>
            {this.props.error && this.renderError()}
            <Tabs defaultActiveKey={1} id="signup-signin-tabs">
              <Tab eventKey={2} title="Sign Up">
                <SignUp onSignUp={this.props.onSignUp}/>
              </Tab>
              <Tab eventKey={1} title="Sign In">
                <SignIn onSignIn={this.props.onSignIn}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="aboutToolTip">RocketShippDB is a free movie database app <small>(utilizing TMDb API)</small> that allows you to save your favorite movies to your "RocketFaves", watch every trailer available on YouTube, view the cast list and monitor how much revenue your faves have made from a given budget! This is a personal project of mine and is completely free.</Tooltip>}
        >
          <button id="aboutLink" onClick={(event) => event.preventDefault()}>
            What is RocketShippDB?
          </button>
        </OverlayTrigger>
      </div>
    );
  }
}

SignUpSignIn.propTypes = {
  error: PropTypes.string,
  onSignUp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired
};

export default SignUpSignIn;
