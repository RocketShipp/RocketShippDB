import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Row className="animated slideInUp">
      <Col id="footerContainer" className="flexBoxCenterThis" xs={12}>
        <div id="contactInfo">
          <h3>RocketShippDB is designed, created and updated by Austin Shipp.</h3>
        </div>
        <div id="contactButtons">
          <a target="_blank" href="https://github.com/rocketshipp">
            <i className="fa fa-github" aria-hidden="true"/>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/austin-shipp-b703877b/">
            <i className="fa fa-linkedin" aria-hidden="true"/>
          </a>
          <a target="_blank" href="mailto:austinshipp@yahoo.com">
            <i className="fa fa-envelope" aria-hidden="true"/>
          </a>
        </div>
      </Col>
    </Row>
  );
};


export default Footer;
