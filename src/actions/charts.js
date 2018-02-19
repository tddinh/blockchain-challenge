import { API_ROOT } from '../constants/endpoints.js';
import "isomorphic-fetch";

export const BITCOIN_STATS_REQUEST = 'BITCOIN_STATS_REQUEST';
export const BITCOIN_STATS_SUCCESS = 'BITCOIN_STATS_SUCCESS';
export const BITCOIN_STATS_FAILURE = 'BITCOIN_STATS_FAILURE';

function requestBitcoinStats() {
  return {
    type: BITCOIN_STATS_REQUEST
  };
}

function receiveBitcoinStats(stats) {
  return {
    type: BITCOIN_STATS_SUCCESS,
    stats
  };
}

function bitcoinStatsError(message) {
  return {
    type: BITCOIN_STATS_FAILURE,
    message
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

    dispatch(requestBitcoinStats());
    return fetch(`${API_ROOT}/stats?format=json&cors=true`, config)
      .then(response =>
        response.json().then(stats => ({ response, stats }))
      ).then(({response, stats}) => {
        dispatch(receiveBitcoinStats(stats));
      })
      .catch(err => {
        dispatch(bitcoinStatsError('Error: ' + err));
      });
  };
}


export const LATEST_AVERAGE_BLOCK_SIZE_REQUEST = 'LATEST_AVERAGE_BLOCK_SIZE_REQUEST';
export const LATEST_AVERAGE_BLOCK_SIZE_SUCCESS = 'LATEST_AVERAGE_BLOCK_SIZE_SUCCESS';
export const LATEST_AVERAGE_BLOCK_SIZE_FAILURE = 'LATEST_AVERAGE_BLOCK_SIZE_FAILURE';

function requestAverageBlockSize() {
  return {
    type: LATEST_AVERAGE_BLOCK_SIZE_REQUEST
  };
}

function receiveAverageBlockSize(stats) {
  return {
    type: LATEST_AVERAGE_BLOCK_SIZE_SUCCESS,
    stats
  };
}

function averageBlockSizeError(message) {
  return {
    type: LATEST_AVERAGE_BLOCK_SIZE_FAILURE,
    message
  };
}

export function fetchLatestAverageBlockSize() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestAverageBlockSize());
    return fetch(`${API_ROOT}/q/24hravgblocksize?cors=true`, config)
      .then(response =>
        response.json().then(avgBlockSize => ({ response, avgBlockSize }))
      ).then(({response, avgBlockSize}) => {
        dispatch(receiveAverageBlockSize({ average: avgBlockSize.toFixed(2) }));
      }).catch(err => {
        dispatch(averageBlockSizeError('Error: ' + err));
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

function receiveConfirmedTransactions(transactions) {
  return {
    type: CONFIRMED_TRANSACTIONS_SUCCESS,
    transactions
  };
}

function confirmedTransactionsError(message) {
  return {
    type: CONFIRMED_TRANSACTIONS_FAILURE,
    message
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

    dispatch(requestConfirmedTransactions())
    return fetch(`${API_ROOT}/charts/n-transactions?cors=true&format=json&lang=en`, config)
      .then(response =>
        response.json().then(transactions => ({ response, transactions }))
      ).then(({response, transactions}) => {
        dispatch(receiveConfirmedTransactions(transactions));
      }).catch(err => {
        dispatch(confirmedTransactionsError('Error: ' + err));
      });
  };
}


export const MEMPOOL_SIZE_REQUEST = 'MEMPOOL_SIZE_REQUEST';
export const MEMPOOL_SIZE_SUCCESS = 'MEMPOOL_SIZE_SUCCESS';
export const MEMPOOL_SIZE_FAILURE = 'MEMPOOL_SIZE_FAILURE';

function requestMempoolSize() {
  return {
    type: MEMPOOL_SIZE_REQUEST
  };
}

function receiveMempoolSize(mempool, mempoolSize) {
  return {
    type: MEMPOOL_SIZE_SUCCESS,
    mempool,
    mempoolSize
  };
}

function mempoolSizeError(message) {
  return {
    type: MEMPOOL_SIZE_FAILURE,
    message
  };
}

export function fetchLatestMempoolSize() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestMempoolSize());
    return fetch(`${API_ROOT}/charts/mempool-size?timespan=1days&format=json&cors=true`, config)
      .then(response =>
        response.json().then(mempool => ({ response, mempool }))
      ).then(({response, mempool}) => {
        const { values } = mempool;
        const mempoolSize = Math.round(values[values.length-1].y);
        dispatch(receiveMempoolSize(mempool, mempoolSize));
      }).catch(err => {
        dispatch(mempoolSizeError('Error: ' + err));
      });
  };
}

export function fetchPendingTransactions() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestMempoolSize());
    return fetch(`${API_ROOT}/charts/mempool-size?cors=true&format=json&lang=en`, config)
      .then(response =>
        response.json().then(mempool => ({ response, mempool }))
      ).then(({response, mempool}) => {
        dispatch(receiveMempoolSize(mempool));
      }).catch(err => {
        dispatch(mempoolSizeError('Error: ' + err));
      });
  };
}
