import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <div className="content">{children}</div>
      </div>
    );
  }
}

export default App;
