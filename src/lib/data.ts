import type { GoldPair, Signal, EducationContent } from './types';

export const goldPairs: GoldPair[] = [
  { pair: 'XAU/USD', price: 2320.55, change: -5.43, changePercent: -0.23 },
  { pair: 'XAU/EUR', price: 2160.78, change: 2.11, changePercent: 0.10 },
  { pair: 'XAU/GBP', price: 1835.12, change: -10.89, changePercent: -0.59 },
  { pair: 'XAU/JPY', price: 364589.6, change: 120.4, changePercent: 0.03 },
  { pair: 'XAU/CHF', price: 2099.45, change: 0.55, changePercent: 0.03 },
];

export const signals: Signal[] = [
  {
    id: '1',
    pair: 'XAU/USD',
    type: 'Buy',
    timestamp: '2024-07-29T14:30:00Z',
    priceAtSignal: 2319.80,
    indicators: { rsi: 28.5, macd: '-0.75 (bullish crossover impending)', movingAverage: { shortTerm: 2325.10, longTerm: 2330.50 } },
    technicalIndicators: 'RSI is at 28.5, indicating it is oversold. MACD is at -0.75, showing potential for a bullish crossover. Short-term MA is below long-term MA.'
  },
  {
    id: '2',
    pair: 'XAU/EUR',
    type: 'Sell',
    timestamp: '2024-07-29T12:15:00Z',
    priceAtSignal: 2165.40,
    indicators: { rsi: 72.1, macd: '1.25 (bearish divergence)', movingAverage: { shortTerm: 2160.20, longTerm: 2155.80 } },
    technicalIndicators: 'RSI is at 72.1, indicating it is overbought. MACD is at 1.25 and shows a bearish divergence pattern. Short-term MA is above long-term MA.'
  },
  {
    id: '3',
    pair: 'XAU/GBP',
    type: 'Hold',
    timestamp: '2024-07-29T10:05:00Z',
    priceAtSignal: 1840.20,
    indicators: { rsi: 55.3, macd: '0.15 (neutral)', movingAverage: { shortTerm: 1840.10, longTerm: 1839.90 } },
    technicalIndicators: 'RSI is at 55.3, which is in the neutral zone. MACD is at 0.15, indicating no strong momentum. Moving averages are tightly packed, suggesting consolidation.'
  },
  {
    id: '4',
    pair: 'XAU/JPY',
    type: 'Buy',
    timestamp: '2024-07-28T22:00:00Z',
    priceAtSignal: 364100.0,
    indicators: { rsi: 32.0, macd: '-150.0 (converging)', movingAverage: { shortTerm: 364500.0, longTerm: 365000.0 } },
    technicalIndicators: 'RSI is at 32.0, approaching oversold levels. MACD is at -150.0 and the lines are converging, hinting at a potential upward move. A golden cross has not yet occurred.'
  },
    {
    id: '5',
    pair: 'XAU/USD',
    type: 'Sell',
    timestamp: '2024-07-28T18:45:00Z',
    priceAtSignal: 2345.50,
    indicators: { rsi: 78.2, macd: '2.50 (overextended)', movingAverage: { shortTerm: 2340.10, longTerm: 2335.50 } },
    technicalIndicators: 'RSI is at 78.2, deep in overbought territory, suggesting a reversal is likely. MACD is at 2.50, indicating the trend is overextended.'
  },
];

export const mainChartData = [
  { date: '2024-07-01', value: [2325, 2335, 2315, 2320] },
  { date: '2024-07-02', value: [2320, 2330, 2318, 2328] },
  { date: '2024-07-03', value: [2328, 2340, 2325, 2338] },
  { date: '2024-07-04', value: [2338, 2345, 2335, 2342] },
  { date: '2024-07-05', value: [2342, 2330, 2320, 2325] },
  { date: '2024-07-08', value: [2325, 2328, 2310, 2312] },
  { date: '2024-07-09', value: [2312, 2322, 2308, 2318] },
  { date: '2024-07-10', value: [2318, 2305, 2295, 2300] },
  { date: '2024-07-11', value: [2300, 2315, 2298, 2310] },
  { date: '2024-07-12', value: [2310, 2325, 2308, 2320] },
  { date: '2024-07-15', value: [2320, 2330, 2315, 2328] },
  { date: '2024-07-16', value: [2328, 2340, 2325, 2335] },
  { date: '2024-07-17', value: [2335, 2350, 2333, 2348] },
  { date: '2024-07-18', value: [2348, 2345, 2330, 2332] },
  { date: '2024-07-19', value: [2332, 2320, 2310, 2315] },
  { date: '2024-07-22', value: [2315, 2325, 2312, 2322] },
  { date: '2024-07-23', value: [2322, 2335, 2320, 2330] },
  { date: '2024-07-24', value: [2330, 2325, 2315, 2320] },
  { date: '2024-07-25', value: [2320, 2330, 2318, 2325] },
  { date: '2024-07-26', value: [2325, 2340, 2322, 2338] },
  { date: '2024-07-29', value: [2338, 2342, 2318, 2320] },
];

export const educationContent: EducationContent[] = [
    {
        id: 'guide-1',
        title: 'How to Read Trading Signals',
        content: 'Our signals are categorized as Buy, Sell, or Hold. A "Buy" signal (Green) suggests the asset is likely to increase in value. A "Sell" signal (Red) suggests a potential decrease. A "Hold" signal (Gray) indicates that market conditions are neutral or uncertain, and it may be best to wait. Always consider these signals as one part of your overall trading strategy.'
    },
    {
        id: 'guide-2',
        title: 'Understanding Technical Indicators',
        content: 'We use several key indicators to generate signals. The Relative Strength Index (RSI) measures momentum; values below 30 are considered "oversold" (potential buy), and values above 70 are "overbought" (potential sell). Moving Average Convergence Divergence (MACD) shows trend direction and momentum. Moving Averages (MA) help identify the current trend direction.'
    },
    {
        id: 'guide-3',
        title: 'Effective Risk Management',
        content: "Never invest more than you are willing to lose. Use stop-loss orders to protect your capital from significant downturns. It's also wise to diversify your investments and not put all your funds into a single asset. Our signals are informational and not financial advice; always conduct your own research."
    },
    {
        id: 'guide-4',
        title: 'Using the GoldenEye App',
        content: 'The Dashboard provides a real-time overview. The Signals page lists all historical signals for your review. The Prediction page offers AI-driven forecasts. Use the Education section to enhance your trading knowledge. Manage your profile and notification settings in the Profile section.'
    }
];
