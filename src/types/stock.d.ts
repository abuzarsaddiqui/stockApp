/**
 * Interface representing stock data for a specific symbol.
 */
export interface StockData {
  /**
   * The symbol of the stock (e.g., "AAPL", "GOOG").
   */
  symbol: string;

  /**
   * The date when the stock data was recorded.
   * This should be in string format, such as "2025-02-03".
   */
  date: string;

  /**
   * The opening price of the stock for the day.
   */
  open: number;

  /**
   * The highest price the stock reached during the day.
   */
  high: number;

  /**
   * The lowest price the stock reached during the day.
   */
  low: number;

  /**
   * The closing price of the stock for the day.
   */
  close: number;

  /**
   * The trading volume of the stock for the day.
   */
  volume: number;
}
