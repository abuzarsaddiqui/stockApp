import { MarketData } from '../types/market';
import { WS_URL, API_KEY, THRESHOLD_LEVEL } from '../constants';

/**
 * Establishes a WebSocket connection to the Tiingo API and subscribes to cryptocurrency data.
 * 
 * @param onMessage - Callback function to handle incoming WebSocket messages.
 * @param onError - Callback function to handle errors during the WebSocket connection.
 * @returns The WebSocket instance.
 */
export const connectWebSocket = (
  onMessage: (data: MarketData) => void,
  onError: (error: Event) => void
): WebSocket => {
  // Initialize WebSocket connection
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('WebSocket connected');

    // Prepare the message to subscribe to the data
    const messageToSend = JSON.stringify({
      eventName: 'subscribe',
      authorization: API_KEY,
      eventData: {
        thresholdLevel: THRESHOLD_LEVEL,
      },
    });

    // Send the subscription message
    ws.send(messageToSend);
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);

      // Process the message if it's of type 'A' and contains data
      if (message.messageType === 'A' && Array.isArray(message.data)) {
        const update: MarketData = {
          ticker: message.data[0], // "T"
          updateType: message.data[1], // "anonsol"
          timestamp: new Date(message.data[2]), // Convert timestamp to Date
          exchange: message.data[3], // "raydium"
          lastSize: message.data[4], // 0.096804544
          lastPrice: message.data[5], // 0.03902212482918157
        };

        // Pass the processed data to the onMessage callback
        onMessage(update);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  // Handle WebSocket error events
  ws.onerror = onError;

  // Handle WebSocket closure
  ws.onclose = () => console.log('WebSocket disconnected');

  return ws;
};

