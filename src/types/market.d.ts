/**
 * Interface representing market data for a specific ticker.
 */
export interface MarketData {
  /**
   * The ticker symbol of the asset (e.g., "AAPL", "TSLA").
   */
  ticker: string;

  /**
   * The type of update (e.g., "price change", "volume update").
   */
  updateType: string;

  /**
   * The timestamp of when the data was updated.
   * This should be a Date object.
   */
  timestamp: Date;

  /**
   * The exchange where the asset is traded (e.g., "NASDAQ", "NYSE").
   */
  exchange: string;

  /**
   * The size of the last trade.
   * This is optional as it may not always be available.
   */
  lastSize?: number;

  /**
   * The price of the last trade.
   * This is optional as it may not always be available.
   */
  lastPrice?: number;
}
