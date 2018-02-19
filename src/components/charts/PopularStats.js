import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class PopularStats extends Component {

  render() {
    const {
      bitcoinStats,
      blockSize,
      mempool
    } = this.props;

    const marketPrice = Math.ceil(bitcoinStats.market_price_usd * 100) / 100;

    return (
      <div id="popular-stats" className="container container-fake">
        <h2 className="f-28 upper center mt-70 mb-35 hidden-xs hidden-sm">Popular Stats</h2>
        <div className="row">
          <div className="col-md-3 center flex-column popular">
            <span className="mt-10 blue f-20">Market Price (USD)</span>
            <a href="javascript:void(0)" className="flex-column center mv-50">
              <span className="f-48">$<span id="market-price">{formatStats(marketPrice)}</span></span>
              <span>USD</span>
            </a>
            <span className="f-14">Average USD market price across major bitcoin exchanges.</span>
          </div>
          <div className="col-md-3 center flex-column popular">
            <span className="mt-10 blue f-20">Average Block Size</span>
            <a href="javascript:void(0)" className="flex-column center mv-50">
              <span className="f-48" id="block-size">{blockSize.average}</span>
              <span>Megabytes</span>
            </a>
            <span className="f-14">The 24 hour average block size in MB.</span>
          </div>
          <div className="col-md-3 center flex-column popular">
            <span className="mt-10 blue f-20">Transactions per Day</span>
            <a href="javascript:void(0)" className="flex-column center mv-50">
              <span className="f-48" id="tx-per-day">{formatStats(bitcoinStats.n_tx)}</span>
              <span>Transactions</span>
            </a>
            <span className="f-14">The aggregate number of confirmed Bitcoin transactions in the past 24 hours.</span>
          </div>
            <div className="col-md-3 center flex-column popular">
            <span className="mt-10 blue f-20">Mempool Size</span>
            <a href="javascript:void(0)" className="flex-column center mv-50">
              <span className="f-48" id="mempool-size">{formatStats(mempool.latest_mempool_size)}</span>
              <span>Bytes</span>
            </a>
            <span className="f-14">The aggregate size of transactions waiting to be confirmed.</span>
          </div>
        </div>
        <div className="center mv-40">
        </div>
      </div>
    );
  }
}

function formatStats(stat) {
  return stat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

PopularStats.propTypes = {
  bitcoinStats: PropTypes.object.isRequired,
  blockSize: PropTypes.object.isRequired,
  mempool: PropTypes.object.isRequired
};
