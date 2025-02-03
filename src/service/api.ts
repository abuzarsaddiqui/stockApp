import { StockData } from "../types/stock";
import { BASE_URL, ACCESS_KEY, SYMBOLS, DATE_FROM, DATE_TO } from '../constants';

/**
 * Fetches market data for the given stock symbols using the external API.
 * If no symbol is provided, it fetches data for the default symbols.
 *
 * @param symbol - The stock symbol(s) to fetch data for. Defaults to a predefined set of symbols.
 * @returns A promise that resolves to an array of StockData objects.
 * @throws Will throw an error if the API request fails.
 */
export const fetchMarketData = async (symbol: string = SYMBOLS): Promise<StockData[]> => {
    const url = `${BASE_URL}?access_key=${ACCESS_KEY}&symbols=${symbol}&date_from=${DATE_FROM}&date_to=${DATE_TO}`;

    // Fetch data from the API
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch market data');
    }

    const jsonData = await response.json();

    // Map API data to StockData format
    return jsonData.data.map((item: any) => ({
        symbol: item.symbol,
        date: new Date(item.date).toDateString(), // Convert timestamp to Date object
        open: item.exchange || 'UNKNOWN', // Default exchange if not available
        volume: item.volume ?? undefined, // Use undefined for null or missing values
        low: item.close ?? 0, // Default low value if missing
        close: item.close ?? 0, // Default close value if missing
        high: item.high ?? 0, // Default high value if missing
    }));
};
