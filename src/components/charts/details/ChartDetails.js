import React, {Component} from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import moment from 'moment';
import Chart from 'chart.js';
import './ChartDetails.scss';
import _ from 'lodash';

export default class ChartDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.activeKey
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.details && !this.props.details) {
      this.initializeChart(nextProps.details, nextProps.activeKey);
      this.toogleActiveChart(nextProps.activeKey);
    }
    else if (nextProps.activeKey !== this.state.active) {
      this.toogleActiveChart(nextProps.activeKey);
    }
  }

  initializeChart(data, key) {
    if (!data) return;

    const chartData = data.values.map((stat, i) => {
      return {
        x: moment.unix(stat.x).format("YYYY-MM-DD HH:mm:ss"),
        y: stat.y
      };
    });

    const ctx = document.getElementById(key);
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.map(stat => stat.x),
          datasets: [{
            label: data.name,
            pointRadius: 0.5,
            borderWidth: 1,
            data: chartData,
            backgroundColor: 'rgba(63, 127, 191, 0.2)',
            borderColor: 'rgba(63, 127, 191, 1)',
          }]
        },
        options: {
            responsive: true,
            hover: {
              mode: 'label'
            },
            tooltips: {
              mode: 'label',
              intersect: false
            },
            scales: {
                xAxes: [{
                  display: true,
                  type: 'time',
                  scaleLabel: {
                    show: true
                  },
                  time: {
                    unit: 'day'
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 13,
                  }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    this.setState({ active: key });
  }

  toogleActiveChart(key) {
    const chart = document.getElementById(this.state.active);
    const nextChart = document.getElementById(key);
    chart.classList.add('hidden');
    nextChart.classList.remove('hidden');
    this.setState({ active: key });
  }

  render() {
    const { details } = this.props;

    return (
      <div className="bg-grey charts-container" id="chart-details">
        <canvas id="bitcoins" className="" width="1170" height="580"></canvas>
        <canvas id="market_prices" className="hidden" width="1170" height="580"></canvas>
        <canvas id="market_cap" className="hidden" width="1170" height="580"></canvas>
        <canvas id="trade_volume" className="hidden" width="1170" height="580"></canvas>
      </div>
    );
  }

}

ChartDetails.propTypes = {
  details: PropTypes.object,
  activeKey: PropTypes.string.isRequired
};
