import { API_ROOT } from '../constants/endpoints.js';
import "isomorphic-fetch";

export const FETCH_BITCOIN_STATS_REQUEST = 'BITCOIN_STATS_REQUEST';
export const FETCH_BITCOIN_STATS_SUCCESS = 'BITCOIN_STATS_SUCCESS';
export const FETCH_BITCOIN_STATS_FAILURE = 'BITCOIN_STATS_FAILURE';

function requestBitcoinStats() {
  return {
    type: FETCH_BITCOIN_STATS_REQUEST
  };
}

function receiveBitcoinStats() {
  return {
    type: FETCH_BITCOIN_STATS_SUCCESS
  };
}

function bitcoinStatsError() {
  return {
    type: FETCH_BITCOIN_STATS_FAILURE
  }
}

export function fetchBitcoinStats() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {
    return fetch(`${API_ROOT}/stats?format=json&cors=true`, config)
      .then(response =>
        response.json().then(data => ({ response, data }))
      ).then(({response, data}) => {
        if (!response.ok) {
          console.log(response);
        }
        return data;
      })
      .catch(err => {
        return err;
      });
  };
}


export const BLOCK_SIZES_REQUEST = 'BLOCK_SIZES_REQUEST';
export const BLOCK_SIZES_SUCCESS = 'BLOCK_SIZES_SUCCESS';
export const BLOCK_SIZES_FAILURE = 'BLOCK_SIZES_FAILURE';

function requestBlockSizes() {
  return {
    type: BLOCK_SIZES_REQUEST
  };
}

function receiveBlockSizes() {
  return {
    type: BLOCK_SIZES_SUCCESS
  };
}

function blockSizesError() {
  return {
    type: BLOCK_SIZES_FAILURE
  };
}

export function fetchDailyBlockSizes() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {
    return fetch(`${API_ROOT}/charts/avg-block-size?cors=true&format=json&lang=en`, config)
      .then(response =>
        response.json().then(transactions => ({ response, transactions }))
      ).then(({response, transactions}) => {
        if (!response.ok) {

        }
      }).catch(err => {
        console.log('error: ',  err);
      });
  };
}


export const CONFIRMED_TRANSACTIONS_REQUEST = 'CONFIRMED_TRANSACTIONS_REQUEST';
export const CONFIRMED_TRANSACTIONS_SUCCESS = 'CONFIRMED_TRANSACTIONS_SUCCESS';
export const CONFIRMED_TRANSACTIONS_FAILURE = 'CONFIRMED_TRANSACTIONS_FAILURE';

function requestConfirmedTransactions() {
  return {
    type: CONFIRMED_TRANSACTIONS_REQUEST
  };
}

function receiveConfirmedTransactions() {
  return {
    type: CONFIRMED_TRANSACTIONS_SUCCESS
  };
}

function confirmedTransactionsError() {
  return {
    type: CONFIRMED_TRANSACTIONS_FAILURE
  };
}


export function fetchDailyConfirmedTransactions() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {
    return fetch(`${API_ROOT}/charts/n-transactions?cors=true&format=json&lang=en`, config)
      .then(response =>
        response.json().then(stats => ({ response, stats }))
      ).then(({response, stats}) => {
        if (!response.ok) {

        }
      }).catch(err => {
        console.log('error: ', err);
      });
  };
}


export const MEMPOOL_SIZES_REQUEST = 'MEMPOOL_SIZES_REQUEST';
export const MEMPOOL_SIZES_SUCCESS = 'MEMPOOL_SIZES_SUCCESS';
export const MEMPOOL_SIZES_FAILURE = 'MEMPOOL_SIZES_FAILURE';

function requestMempoolSizes() {
  return {
    type: MEMPOOL_SIZES_REQUEST
  };
}

function receiveMempoolSizes() {
  return {
    type: MEMPOOL_SIZES_SUCCESS
  };
}

function mempoolSizesError() {
  return {
    type: MEMPOOL_SIZES_FAILURE
  };
}

export function fetchDailyPendingTransactions() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {
    return fetch(`${API_ROOT}/charts/mempool-size?cors=true&format=json&lang=en`, config)
      .then(response =>
        response.json().then(stats => ({ response, stats }))
      ).then(({response, stats}) => {
        if (!response.ok) {

        }

      }).catch(err => {
        console.log('error: ', err);
      });
  };
}
