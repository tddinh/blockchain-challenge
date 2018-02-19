import {
  BITCOIN_STATS_REQUEST,
  BITCOIN_STATS_SUCCESS,
  BITCOIN_STATS_FAILURE,
  LATEST_AVERAGE_BLOCK_SIZE_REQUEST,
  LATEST_AVERAGE_BLOCK_SIZE_SUCCESS,
  LATEST_AVERAGE_BLOCK_SIZE_FAILURE,
  CONFIRMED_TRANSACTIONS_REQUEST,
  CONFIRMED_TRANSACTIONS_SUCCESS,
  CONFIRMED_TRANSACTIONS_FAILURE,
  MEMPOOL_SIZE_REQUEST,
  MEMPOOL_SIZE_SUCCESS,
  MEMPOOL_SIZE_FAILURE
} from '../actions/charts';

export default function(state = {
  bitcoin_stats: null,
  block_size: {
    average: 0
  },
  transactions: {
    confirmed_txs: null,
    mempool: null
  },
  isFetching: false,
  errorMessage: ''
}, action) {

  switch(action.type) {
    case BITCOIN_STATS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case BITCOIN_STATS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        bitcoin_stats: action.stats
      });

    case BITCOIN_STATS_FAILURE:
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
