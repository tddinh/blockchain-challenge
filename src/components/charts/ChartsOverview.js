import React, {Component} from "react";
import PropTypes from 'prop-types';
import PopularStats from './PopularStats';
import CurrencyStats from './CurrencyStats';
import Spinner from '../utilities/spinner/Spinner';

export default class ChartsOverview extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      statistics,
      isFetching,
      currencyActions
    } = this.props;

    const isLoading = (!statistics.summary
                          || !statistics.block_size
                          || !statistics.transactions.mempool);

    if (isLoading) {
      return (
        <Spinner/>
      );
    }
    else {
      return (
        <div className="charts">
          <PopularStats
            summary={statistics.summary}
            mempool={statistics.transactions.mempool}
            blockSize={statistics.block_size}/>
          <CurrencyStats
            statistics={statistics}
            actions={currencyActions}/>
        </div>
      );
    }
  }
}

ChartsOverview.propTypes = {
  statistics: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currencyActions: PropTypes.object.isRequired
};
