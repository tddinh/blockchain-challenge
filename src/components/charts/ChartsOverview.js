import React, {Component} from "react";
import PropTypes from 'prop-types';
import PopularStats from './PopularStats';
import CurrencyStats from './CurrencyStats';
import Spinner from '../utilities/spinner/Spinner';

export default class ChartsOverview extends Component {

  render() {
    const {
      statistics,
      isFetching
    } = this.props;

    const isLoading = (isFetching || !statistics.bitcoin_stats
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
            bitcoinStats={statistics.bitcoin_stats}
            mempool={statistics.transactions.mempool}
            blockSize={statistics.block_size}/>
          <CurrencyStats statistics={statistics}/>
        </div>
      );
    }
  }
}

ChartsOverview.propTypes = {
  statistics: PropTypes.object.isRequired
};
