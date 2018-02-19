import React, {Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ChartDetails from './details/ChartDetails';
import './CurrencyStats.scss';

const TAB_OPTIONS = [
  {key: 'bitcoins', label:'Bitcoins in circulation'},
  {key: 'market_prices', label: 'Market Price (USD)'},
  {key: 'market_cap', label:'Market Capitalization'},
  {key: 'trade_volume', label: 'Exchange Trade Volume (USD)'}
];

export default class CurrencyStats extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: TAB_OPTIONS[0].key
    };
  }

  handleSelectTab(key, event) {
    event.preventDefault();
    if (key === 'bitcoins') {
      this.props.actions.getTotalBitcoins();
    }
    else if (key === 'market_prices') {
      this.props.actions.getMarketPrices();
    }
    else if (key === 'market_cap') {
      this.props.actions.getMarketCap();
    }
    else if (key === 'trade_volume') {
      this.props.actions.getTradeVolume();
    }
    this.setState({ activeTab: key });
  }

  renderActionTabs(tab) {
    const tabClass = classnames({
      'tab': true,
      'mx-auto': true,
      'nav-item': true,
      'tab-is-active': this.state.activeTab === tab.key
    });
    return (
      <a href="javascript:void(0)" className={tabClass} key={tab.key} onClick={this.handleSelectTab.bind(this, tab.key)}>
        <span className="option"/>
        <span className="pl-2">{tab.label}</span>
      </a>
    );
  }

  render() {
    const { statistics } = this.props;

    return (
      <div className="bg-grey charts-container" id="currency-statistics">
        <div className="container pv-50 active">
          <h3 className="center mb-30 mtn upper flex-center flex-between">
            Currency statistics
              <i className="icon-down_arrow visible-xs blue pointer"></i>
          </h3>

          <div className="row mb-5">
            <div className="nav tabs" role="group">
              {TAB_OPTIONS.map((tab) =>
                this.renderActionTabs(tab)
              )}
            </div>
          </div>

          <div className="row">
            <ChartDetails
              details={statistics[this.state.activeTab]}/>
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-6 center">
              <a href="/charts/total-bitcoins">
                <div className="border bg-white pv-10">
                  <span className="f-16 chart-title blue ph-10">Bitcoins in circulation</span>
                  <img src="https://api.blockchain.info/charts/thumbnail/total-bitcoins.png" className="width-80 mt-10" alt="The total number of bitcoins that have already been mined."/>
                </div>
              </a>
              <div className="mt-10 chart-desc">The total number of bitcoins that have already been mined.</div>
            </div>
            <div className="col-md-3 col-sm-6 center">
              <a href="/charts/market-price">
                <div className="border bg-white pv-10">
                  <span className="f-16 chart-title blue ph-10">Market Price (USD)</span>
                  <img src="https://api.blockchain.info/charts/thumbnail/market-price.png" className="width-80 mt-10" alt="Average USD market price across major bitcoin exchanges."/>
                </div>
              </a>
              <div className="mt-10 chart-desc">Average USD market price across major bitcoin exchanges.</div>
            </div>
            <div className="col-md-3 col-sm-6 center">
              <a href="/charts/market-cap">
                <div className="border bg-white pv-10">
                  <span className="f-16 chart-title blue ph-10">Market Capitalization</span>
                  <img src="https://api.blockchain.info/charts/thumbnail/market-cap.png" className="width-80 mt-10" alt="The total USD value of bitcoin supply in circulation."/>
                </div>
              </a>
              <div className="mt-10 chart-desc">The total USD value of bitcoin supply in circulation.</div>
            </div>
            <div className="col-md-3 col-sm-6 center">
              <a href="/charts/trade-volume">
                <div className="border bg-white pv-10">
                  <span className="f-16 chart-title blue ph-10">USD Exchange Trade Volume</span>
                  <img src="https://api.blockchain.info/charts/thumbnail/trade-volume.png" className="width-80 mt-10" alt="The total USD value of trading volume on major bitcoin exchanges."/>
                </div>
              </a>
              <div className="mt-10 chart-desc">The total USD value of trading volume on major bitcoin exchanges.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrencyStats.propTypes = {
  statistics: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
