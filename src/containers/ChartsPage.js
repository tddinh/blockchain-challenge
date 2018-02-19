import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ChartsOverview from '../components/charts/ChartsOverview';
import {
  fetchBitcoinStats,
  fetchDailyConfirmedTransactions,
  fetchLatestAverageBlockSize,
  fetchLatestMempoolSize
} from '../actions/charts';

class ChartsPage extends Component {

  componentWillMount() {
    this.props.getBitcoinStats();
    this.props.getAverageBlockSize();
    // this.props.getConfirmedTransactions();
    this.props.getMempoolSize();
  }

  render() {
    const { statistics, isFetching } = this.props;

    return (
      <div id="charts-page">
        <ChartsOverview
          statistics={statistics}
          isFetching={isFetching}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statistics: state.charts,
    isFetching: state.charts.isFetching,
    errorMessage: state.charts.errorMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBitcoinStats: () => {
      dispatch(fetchBitcoinStats());
    },
    getAverageBlockSize: () => {
      dispatch(fetchLatestAverageBlockSize());
    },
    getConfirmedTransactions: () => {
      dispatch(fetchDailyConfirmedTransactions());
    },
    getMempoolSize: () => {
      dispatch(fetchLatestMempoolSize());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPage);
