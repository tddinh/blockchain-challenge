import React, {Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ChartDetails from './details/ChartDetails';
import './CurrencyStats.scss';
import _ from 'lodash';

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
      activeTab: TAB_OPTIONS[0].key,
      selectedChart: null
    };
  }

  componentWillMount() {
    this.getChartData(this.state.activeTab);
  }

  componentWillReceiveProps(nextProps) {
    const {
      activeTab,
      selectedChart
    } = this.state;

    if (nextProps.statistics[activeTab] && !selectedChart) {
      this.setState({ selectedChart: nextProps.statistics[activeTab] });
    }
  }

  handleSelectTab(key, event) {
    const selectedChart = this.props.statistics[key];
    if (!selectedChart) {
      this.getChartData(key);
    }
    this.setState({ activeTab: key, selectedChart: selectedChart });
  }

  getChartData(key) {
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
              details={this.state.selectedChart}
              activeKey={this.state.activeTab}/>
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
