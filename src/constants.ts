/**
 * Constants for API base URL, access key, and stock symbols.
 * These constants are used to fetch market data from the external API.
 */

export const BASE_URL = 'http://api.marketstack.com/v2/eod';
export const ACCESS_KEY = '26481fcb82bde85cdfb7034699076a25';
export const SYMBOLS = 'AAPL,MSFT,AMZN,TSLA,GOOGL,GOOG,META,NVDA,BRK.A,JPM';
export const DATE_FROM = '2025-01-24';
export const DATE_TO = '2025-02-03';

/**
 * Constants for WebSocket connection and authorization.
 * These values are used to establish a WebSocket connection and authenticate with the Tiingo API.
 */

export const WS_URL = 'wss://api.tiingo.com/crypto';
export const API_KEY = '8868587c6d03cb28d3f7df297b9afd0ee5a63b76';
export const THRESHOLD_LEVEL = 2;
