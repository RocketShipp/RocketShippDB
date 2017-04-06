import React, {Component} from 'react';

class Protected extends Component {
  constructor() {
    super();

    this.state = {
      thing: ''
    };
  }
  render() {
    return (
      <div className="flexBoxCenterThis">
        <h1>Protected page baby!</h1>
      </div>
    );
  }
}

export default Protected;
