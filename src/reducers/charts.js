import {
  FETCH_BITCOIN_STATS_REQUEST,
  FETCH_BITCOIN_STATS_SUCCESS,
  FETCH_BITCOIN_STATS_FAILURE,
  BLOCK_SIZES_REQUEST,
  BLOCK_SIZES_SUCCESS,
  BLOCK_SIZES_FAILURE,
  CONFIRMED_TRANSACTIONS_REQUEST,
  CONFIRMED_TRANSACTIONS_SUCCESS,
  CONFIRMED_TRANSACTIONS_FAILURE,
  MEMPOOL_SIZES_REQUEST,
  MEMPOOL_SIZES_SUCCESS,
  MEMPOOL_SIZES_FAILURE
} from '../actions/charts';

export default function(state = {
}, action) {

  switch(action.type) {
    case FETCH_BITCOIN_STATS_REQUEST:
      return Object.assign({}, state, {

      });
    case FETCH_BITCOIN_STATS_SUCCESS:
      return Object.assign({}, state, {
        
      });
    case FETCH_BITCOIN_STATS_FAILURE:
      return Object.assign({}, state, {
        
      });
    case BLOCK_SIZES_REQUEST:
      return Object.assign({}, state, {
        
      });
    case BLOCK_SIZES_SUCCESS:
      return Object.assign({}, state, {
        
      });
    case BLOCK_SIZES_FAILURE:
      return Object.assign({}, state, {
        
      });
    case CONFIRMED_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        
      });
    case CONFIRMED_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        
      });
    case CONFIRMED_TRANSACTIONS_FAILURE:
      return Object.assign({}, state, {
        
      });
    case MEMPOOL_SIZES_REQUEST:
      return Object.assign({}, state, {
        
      });
    case MEMPOOL_SIZES_SUCCESS:
      return Object.assign({}, state, {
        
      });
    case MEMPOOL_SIZES_FAILURE:
      return Object.assign({}, state, {
        
      });

    default:
      return state;
  }
}
