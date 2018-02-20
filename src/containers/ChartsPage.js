import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ChartsOverview from '../components/charts/ChartsOverview';
import {
  fetchStatsOverview,
  fetchDailyConfirmedTransactions,
  fetchLatestAverageBlockSize,
  fetchLatestMempoolSize,
  fetchTotalBitcoins,
  fetchMarketPrices,
  fetchMarketCap,
  fetchTradeVolume
} from '../actions/charts';

class ChartsPage extends Component {

  componentWillMount() {
    this.props.getStatsOverview();
    this.props.getAverageBlockSize();
    // this.props.getConfirmedTransactions();
    this.props.getMempoolSize();
  }

  render() {
    const { statistics, isFetching, currencyActions } = this.props;

    return (
      <div id="charts-page">
        <ChartsOverview
          statistics={statistics}
          isFetching={isFetching}
          currencyActions={currencyActions}/>
      </div>
    );
  }
}

ChartsPage.propTypes = {
  statistics: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currencyActions: PropTypes.object.isRequired,
  getStatsOverview: PropTypes.func.isRequired,
  getAverageBlockSize: PropTypes.func.isRequired,
  getConfirmedTransactions: PropTypes.func.isRequired,
  getMempoolSize: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    statistics: state.charts,
    isFetching: state.charts.isFetching,
    errorMessage: state.charts.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatsOverview: () => {
      dispatch(fetchStatsOverview());
    },
    getAverageBlockSize: () => {
      dispatch(fetchLatestAverageBlockSize());
    },
    getConfirmedTransactions: () => {
      dispatch(fetchDailyConfirmedTransactions());
    },
    getMempoolSize: () => {
      dispatch(fetchLatestMempoolSize());
    },
    currencyActions: {
      getTotalBitcoins: () => {
        dispatch(fetchTotalBitcoins());
      },
      getMarketPrices: () => {
        dispatch(fetchMarketPrices());
      },
      getMarketCap: () => {
        dispatch(fetchMarketCap());
      },
      getTradeVolume: () => {
        dispatch(fetchTradeVolume());
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPage);
