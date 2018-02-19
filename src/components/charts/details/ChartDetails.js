import React, {Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import Chart from 'chart.js';
import { Line as LineChart  } from 'react-chartjs';
import './ChartDetails.scss';

export default class ChartDetails extends Component {

  constructor() {
    super();
    this.state = {
      filter: ''
    }
  }

  componentDidMount() {debugger
    this.renderChartData(this.props.details);
    this.renderChartDataExample();
  }

  renderChartData(data) {
    if (!data) return;
    debugger;
    window.moment = moment;
    const checkpoint = Math.round(data.values.length / 12);
    const markCheckpoints = [];

    const mapTime = data.values.map((stat, i) => {
      const formattedTime = moment.unix(stat.x).format("YYYY-MM-DD HH:mm:ss");
      if (i % checkpoint === 0) markCheckpoints.push(formattedTime);
      return {
        x: formattedTime,
        y: stat.y
      }
    });

    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: markCheckpoints,
        datasets: [{
          label: data.name,
          pointRadius: 0.3,
          borderWidth: 1,
          data: mapTime,
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
                  unit: 'minute',
                  displayFormats: {
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
  }

  renderChartDataExample() {
    const ctx = document.getElementById("myChartExample");
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  render() {

    return (
      <div className="bg-grey charts-container" id="chart-details">
        <canvas id="myChart" ref="myChart" width="1170" height="568"></canvas>
        <canvas id="myChartExample" ref="myChartExample" width="400" height="400"></canvas>
      </div>
    );
  }
}

ChartDetails.propTypes = {
  details: PropTypes.object.isRequired
};
