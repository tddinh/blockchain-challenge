import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  fetchBitcoinStats
} from '../actions/charts';

class ChartsPage extends Component {

  componentWillMount() {
    this.props.fetchBitcoinStats();
  }

  render() {
    return (
      <div>
        <h2>Popular Stats</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBitcoinStats: fetchBitcoinStats
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPage);
