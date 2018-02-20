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

App.propTypes = {
  children: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
