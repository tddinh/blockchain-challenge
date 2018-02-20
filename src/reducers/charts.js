import {
  STATISTICS_OVERVIEW_REQUEST,
  STATISTICS_OVERVIEW_SUCCESS,
  STATISTICS_OVERVIEW_FAILURE,
  LATEST_AVERAGE_BLOCK_SIZE_REQUEST,
  LATEST_AVERAGE_BLOCK_SIZE_SUCCESS,
  LATEST_AVERAGE_BLOCK_SIZE_FAILURE,
  CONFIRMED_TRANSACTIONS_REQUEST,
  CONFIRMED_TRANSACTIONS_SUCCESS,
  CONFIRMED_TRANSACTIONS_FAILURE,
  MEMPOOL_SIZE_REQUEST,
  MEMPOOL_SIZE_SUCCESS,
  MEMPOOL_SIZE_FAILURE,
  TOTAL_BITCOINS_REQUEST,
  TOTAL_BITCOINS_SUCCESS,
  TOTAL_BITCOINS_FAILURE,
  MARKET_PRICES_REQUEST,
  MARKET_PRICES_SUCCESS,
  MARKET_PRICES_FAILURE,
  MARKET_CAP_REQUEST,
  MARKET_CAP_SUCCESS,
  MARKET_CAP_FAILURE,
  TRADE_VOLUME_REQUEST,
  TRADE_VOLUME_SUCCESS,
  TRADE_VOLUME_FAILURE
} from '../actions/charts';


export default function(state = {
  summary: null,
  block_size: {
    average: 0
  },
  transactions: {
    confirmed_txs: null,
    mempool: null
  },
  bitcoins: null,
  market_prices: null,
  market_cap: null,
  trade_volume: null,
  isFetching: false,
  errorMessage: ''
}, action) {

  switch(action.type) {
    case STATISTICS_OVERVIEW_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case STATISTICS_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        summary: action.stats
      });

    case STATISTICS_OVERVIEW_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isFetching: false
      });

    case LATEST_AVERAGE_BLOCK_SIZE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case LATEST_AVERAGE_BLOCK_SIZE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        block_size: Object.assign({}, state.block_size, {
          average: action.stats.average
        })
      });

    case LATEST_AVERAGE_BLOCK_SIZE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case CONFIRMED_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case CONFIRMED_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        transactions: Object.assign({}, state.transactions, {
          confirmed_txs: action.transactions
        })
      });

    case CONFIRMED_TRANSACTIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case MEMPOOL_SIZE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case MEMPOOL_SIZE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        transactions: Object.assign({}, state.transactions, {
          mempool: Object.assign({}, action.mempool, {
            latest_mempool_size: action.mempoolSize
          })
        })
      });

    case MEMPOOL_SIZE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case TOTAL_BITCOINS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case TOTAL_BITCOINS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        bitcoins: action.stats
      });

    case TOTAL_BITCOINS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case MARKET_PRICES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case MARKET_PRICES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        market_prices: action.prices
      });

    case MARKET_PRICES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case MARKET_CAP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case MARKET_CAP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        market_cap: action.stats
      });

    case MARKET_CAP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case TRADE_VOLUME_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case TRADE_VOLUME_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        trade_volume: action.trades
      });

    case TRADE_VOLUME_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    default:
      return state;
  }
}

function formatChartStats(stats) {
  const average = stats.values.reduce(
    (acc, data, i) => {
      return acc + data.y;
    }, 0) / stats.values.length;

  const newValues = stats.values.map(
      data => ({ x: new Date(data.x * 1000), y: data.y })
    );

  return Object.assign({}, stats, {
    values: newValues,
    average: average
  });
}
