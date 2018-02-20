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
      this.renderSelectedChart(nextProps.activeKey);
    }
    else if (nextProps.activeKey !== this.state.active) {
      this.renderSelectedChart(nextProps.activeKey);
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
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.map(stat => stat.x),
          datasets: [{
            label: data.name,
            pointRadius: 0.5,
            borderWidth: 1,
            data: chartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
          }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: 'YYYY-MM-DD',
                      hour: 'HH:mm:ss'
                    }
                  }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    this.setState({ active: key });
  }

  renderSelectedChart(key) {
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
