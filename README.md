
# **Stock Market App**

## **Overview**

This is a simple and elegant stock market app built with **React Native**. It allows you to view market data, track stock prices in real-time using WebSocket or Rest connections, and search for specific stock information. The app fetches historical stock data and displays it in an easy-to-read format.

### **Features:**
- **Real-Time Market Data:** Fetches market updates for real-time updates.
- **Search Functionality:** Search for stocks and filter results based on ticker symbols.
- **Beautiful UI:** An intuitive, clean, and engaging user interface designed with React Native components.
- **Stock Details:** View detailed stock data such as open, high, low, close, volume, and timestamp.

## **Tech Stack:**
- **React Native**: For building cross-platform mobile apps.
- **React Navigation**: For navigation management.
- **React Query**: For efficient data fetching and caching.
- **WebSocket**: For real-time market updates.
- **TypeScript**: For type safety and improved development experience.
- **Linear Gradient**: For beautiful background effects.

---

## **Installation Guide**

Follow the steps below to get this application running on your local machine.

### **1. Prerequisites**
Before starting the setup, make sure you have the following installed:

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed. You can check the installation by running the command:
  ```bash
  node -v
  ```

- **React Native CLI or Expo CLI**: You need either of these to run React Native projects.

  - **Expo CLI** (recommended for quick setup):
    ```bash
    npm install -g expo-cli
    ```

  - **React Native CLI** (if you prefer native code access):
    - Install dependencies for macOS/Linux/Windows. Follow the [React Native CLI Getting Started](https://reactnative.dev/docs/environment-setup) guide for detailed instructions.

### **2. Clone the Repository**
Clone the repository to your local machine using Git:

```bash
git clone https://github.com/abuzarsaddiqui/stockApp.git
cd stock-market-app
```

### **3. Install Dependencies**
Install all the required packages and dependencies for the app:

```bash
npm install
```

This will install the following packages:
- **React Native dependencies**
- **React Query**
- **React Navigation**
- **Lodash** (for debouncing search input)
- **WebSocket** and other necessary libraries

### **4. Set Up the Development Environment**
If you're using **Expo CLI**, you can start the app by running:

```bash
npm start
```

This will open Expo Developer Tools in your browser. You can then scan the QR code with the Expo Go app on your phone or use the Android/iOS simulator to preview the app.

If you're using **React Native CLI** (without Expo), you can run the following commands to build and run the app on a simulator or real device:

```bash
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS
```

### **5. Run the App**
Once the dependencies are installed and the environment is set up, you can start the app using the following command:

```bash
npm start
```

Or, for a specific platform (Android/iOS), you can run:

```bash
npx react-native run-android
# Or
npx react-native run-ios
```

---

## **Project Structure**

Here is a quick overview of the project structure:

```
stockApp/
├── src/
│   ├── components/                # Reusable UI components (e.g., StockItem, SearchBar, etc.)
│   ├── context/                   # Market data context (for state management)
│   ├── navigation/                # Navigation setup (AppNavigator)
│   ├── screens/                   # Screen components (e.g., HomeScreen, StockDetailScreen)
│   ├── service/                   # API and WebSocket services
│   ├── styles.tsx                    # Global styling
│   ├── constants.ts                  # Global constant (e.g ACCESS_KEY)
│   └── types/                     # TypeScript type definitions (MarketData, StockData)
├── App.tsx                        # App entry point
└── package.json                   # Project dependencies
```

---

## **How It Works**

### **1. Market Data Fetching**

The app fetches stock data from an API using **React Query**. A query is made to get stock data based on the selected symbol. The data is then stored and updated in the app state, which can be accessed anywhere in the app using the context API.

```typescript
const { data: marketData, isLoading, isError } = useQuery<StockData[]>({
  queryKey: ['market', searchQuery],
  queryFn: () => fetchMarketData(searchQuery),
  enabled: !!searchQuery,
});
```

### **2. Real-Time Updates Using WebSocket**

The app establishes a WebSocket connection to receive real-time market data updates. It listens to new messages, processes the data, and updates the UI accordingly.

```typescript
export const connectWebSocket = (onMessage: (data: MarketData) => void, onError: (error: Event) => void): WebSocket => {
  const ws = new WebSocket('wss://api.tiingo.com/crypto');

  ws.onmessage = (event) => {
    // Handle the incoming message and update the state
    const message = JSON.parse(event.data);
    onMessage(message);
  };

  return ws;
};
```

---

## **Custom Components**

### **StockItem**
Displays an individual stock's basic information (symbol, open, close, etc.).

### **SearchBarComponent**
A search bar to filter stocks by symbol.

### **ChartComponent**
Displays a basic chart for the stock data (you can replace it with a library like `react-native-chart-kit`).

