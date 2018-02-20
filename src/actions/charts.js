import { API_ROOT } from '../constants/endpoints.js';
import "isomorphic-fetch";

export const STATISTICS_OVERVIEW_REQUEST = 'STATISTICS_OVERVIEW_REQUEST';
export const STATISTICS_OVERVIEW_SUCCESS = 'STATISTICS_OVERVIEW_SUCCESS';
export const STATISTICS_OVERVIEW_FAILURE = 'STATISTICS_OVERVIEW_FAILURE';

function requestStatsOverview() {
  return {
    type: STATISTICS_OVERVIEW_REQUEST
  };
}

function receiveStatsOverview(stats) {
  return {
    type: STATISTICS_OVERVIEW_SUCCESS,
    stats
  };
}

function statsOverviewError(message) {
  return {
    type: STATISTICS_OVERVIEW_FAILURE,
    message
  };
}

export function fetchStatsOverview() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestStatsOverview());
    return fetch(`${API_ROOT}/stats?format=json&cors=true`, config)
      .then(response =>
        response.json().then(stats => ({ response, stats }))
      ).then(({response, stats}) => {
        dispatch(receiveStatsOverview(stats));
      })
      .catch(err => {
        dispatch(statsOverviewError('Error: ' + err));
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

    dispatch(requestConfirmedTransactions());
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


export const TOTAL_BITCOINS_REQUEST = 'TOTAL_BITCOINS_REQUEST';
export const TOTAL_BITCOINS_SUCCESS = 'TOTAL_BITCOINS_SUCCESS';
export const TOTAL_BITCOINS_FAILURE = 'TOTAL_BITCOINS_FAILURE';

function requestTotalBitcoins() {
  return {
    type: TOTAL_BITCOINS_REQUEST
  };
}

function receiveTotalBitcoins(stats) {
  return {
    type: TOTAL_BITCOINS_SUCCESS,
    stats
  };
}

function totalBitcoinsError(message) {
  return {
    type: TOTAL_BITCOINS_FAILURE,
    message
  };
}

export function fetchTotalBitcoins() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestTotalBitcoins());
    return fetch(`${API_ROOT}/charts/total-bitcoins?cors=true&amp;format=json&amp;lang=en`, config)
      .then(response =>
        response.json().then(stats => ({ response, stats }))
      ).then(({response, stats}) => {
        dispatch(receiveTotalBitcoins(stats));
      }).catch(err => {
        dispatch(totalBitcoinsError('Error: ' + err));
      });
  };
}


export const MARKET_PRICES_REQUEST = 'MARKET_PRICES_REQUEST';
export const MARKET_PRICES_SUCCESS = 'MARKET_PRICES_SUCCESS';
export const MARKET_PRICES_FAILURE = 'MARKET_PRICES_FAILURE';

function requestMarketPrices() {
  return {
    type: MARKET_PRICES_REQUEST
  };
}

function receiveMarketPrices(prices) {
  return {
    type: MARKET_PRICES_SUCCESS,
    prices
  };
}

function marketPricesError(message) {
  return {
    type: MARKET_PRICES_FAILURE,
    message
  };
}

export function fetchMarketPrices() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestMarketPrices());
    return fetch(`${API_ROOT}/charts/market-price?cors=true&amp;format=json&amp;lang=en`, config)
      .then(response =>
        response.json().then(prices => ({ response, prices }))
      ).then(({response, prices}) => {
        dispatch(receiveMarketPrices(prices));
      }).catch(err => {
        dispatch(marketPricesError('Error: ' + err));
      });
  };
}


export const MARKET_CAP_REQUEST = 'MARKET_CAP_REQUEST';
export const MARKET_CAP_SUCCESS = 'MARKET_CAP_SUCCESS';
export const MARKET_CAP_FAILURE = 'MARKET_CAP_FAILURE';

function requestMarketCap() {
  return {
    type: MARKET_CAP_REQUEST
  };
}

function receiveMarketCap(stats) {
  return {
    type: MARKET_CAP_SUCCESS,
    stats
  };
}

function marketCapError(message) {
  return {
    type: MARKET_CAP_FAILURE,
    message
  };
}

export function fetchMarketCap() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestMarketCap());
    return fetch(`${API_ROOT}/charts/market-cap?cors=true&amp;format=json&amp;lang=en`, config)
      .then(response =>
        response.json().then(stats => ({ response, stats }))
      ).then(({response, stats}) => {
        dispatch(receiveMarketCap(stats));
      }).catch(err => {
        dispatch(marketCapError('Error: ' + err));
      });
  };
}


export const TRADE_VOLUME_REQUEST = 'TRADE_VOLUME_REQUEST';
export const TRADE_VOLUME_SUCCESS = 'TRADE_VOLUME_SUCCESS';
export const TRADE_VOLUME_FAILURE = 'TRADE_VOLUME_FAILURE';

function requestTradeVolume() {
  return {
    type: TRADE_VOLUME_REQUEST
  };
}

function receiveTradeVolume(trades) {
  return {
    type: TRADE_VOLUME_SUCCESS,
    trades
  };
}

function tradeVolumeError(message) {
  return {
    type: TRADE_VOLUME_FAILURE,
    message
  };
}

export function fetchTradeVolume() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };

  return (dispatch, getState) => {

    dispatch(requestTradeVolume());
    return fetch(`${API_ROOT}/charts/trade-volume?cors=true&amp;format=json&amp;lang=en`, config)
      .then(response =>
        response.json().then(trades => ({ response, trades }))
      ).then(({response, trades}) => {
        dispatch(receiveTradeVolume(trades));
      }).catch(err => {
        dispatch(tradeVolumeError('Error: ' + err));
      });
  };
}
