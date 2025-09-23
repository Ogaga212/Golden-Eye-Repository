import type { GoldPair, Signal, EducationContent } from './types';

export const goldPairs: GoldPair[] = [
  { pair: 'XAU/USD', price: 2327.88, change: 7.33, changePercent: 0.32 },
  { pair: 'XAU/EUR', price: 2158.67, change: -2.11, changePercent: -0.10 },
  { pair: 'XAU/GBP', price: 1842.99, change: 7.87, changePercent: 0.43 },
  { pair: 'XAU/JPY', price: 364681.2, change: -228.8, changePercent: -0.06 },
  { pair: 'XAU/CHF', price: 2101.15, change: 1.70, changePercent: 0.08 },
];

export const signals: Signal[] = [
  {
    id: '1',
    pair: 'XAU/USD',
    type: 'Buy',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    priceAtSignal: 2325.40,
    indicators: { rsi: 31.2, macd: '-0.65 (bullish crossover impending)', movingAverage: { shortTerm: 2326.10, longTerm: 2328.50 } },
    technicalIndicators: 'RSI is at 31.2, indicating it is approaching oversold. MACD is at -0.65, showing potential for a bullish crossover. Short-term MA is below long-term MA.'
  },
  {
    id: '2',
    pair: 'XAU/EUR',
    type: 'Sell',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 2161.80,
    indicators: { rsi: 68.9, macd: '1.15 (bearish divergence)', movingAverage: { shortTerm: 2160.20, longTerm: 2157.80 } },
    technicalIndicators: 'RSI is at 68.9, indicating it is nearing overbought. MACD is at 1.15 and shows a bearish divergence pattern. Short-term MA is above long-term MA.'
  },
  {
    id: '3',
    pair: 'XAU/GBP',
    type: 'Hold',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 1840.20,
    indicators: { rsi: 51.7, macd: '0.05 (neutral)', movingAverage: { shortTerm: 1840.10, longTerm: 1840.90 } },
    technicalIndicators: 'RSI is at 51.7, which is in the neutral zone. MACD is at 0.05, indicating no strong momentum. Moving averages are tight, suggesting consolidation.'
  },
  {
    id: '4',
    pair: 'XAU/JPY',
    type: 'Buy',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 364250.0,
    indicators: { rsi: 34.0, macd: '-140.0 (converging)', movingAverage: { shortTerm: 364500.0, longTerm: 364900.0 } },
    technicalIndicators: 'RSI is at 34.0, approaching oversold levels. MACD is at -140.0 and the lines are converging, hinting at a potential upward move.'
  },
    {
    id: '5',
    pair: 'XAU/USD',
    type: 'Sell',
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 2335.50,
    indicators: { rsi: 75.2, macd: '2.10 (overextended)', movingAverage: { shortTerm: 2334.10, longTerm: 2331.50 } },
    technicalIndicators: 'RSI is at 75.2, in overbought territory, suggesting a reversal is likely. MACD is at 2.10, indicating the trend may be overextended.'
  },
];

export const mainChartData = [
  { date: '2024-07-01', value: [2325.10, 2335.40, 2315.80, 2320.90] },
  { date: '2024-07-02', value: [2320.90, 2330.60, 2318.20, 2328.70] },
  { date: '2024-07-03', value: [2328.70, 2340.10, 2325.30, 2338.40] },
  { date: '2024-07-04', value: [2338.40, 2345.00, 2335.50, 2342.10] },
  { date: '2024-07-05', value: [2342.10, 2330.80, 2320.50, 2325.60] },
  { date: '2024-07-08', value: [2325.60, 2328.90, 2310.20, 2312.30] },
  { date: '2024-07-09', value: [2312.30, 2322.80, 2308.10, 2318.40] },
  { date: '2024-07-10', value: [2318.40, 2305.70, 2295.90, 2300.50] },
  { date: '2024-07-11', value: [2300.50, 2315.60, 2298.80, 2310.70] },
  { date: '2024-07-12', value: [2310.70, 2325.10, 2308.40, 2320.80] },
  { date: '2024-07-15', value: [2320.80, 2330.20, 2315.90, 2328.30] },
  { date: '2024-07-16', value: [2328.30, 2340.50, 2325.70, 2335.60] },
  { date: '2024-07-17', value: [2335.60, 2350.00, 2333.10, 2348.20] },
  { date: '2024-07-18', value: [2348.20, 2345.90, 2330.40, 2332.50] },
  { date: '2024-07-19', value: [2332.50, 2320.30, 2310.80, 2315.90] },
  { date: '2024-07-22', value: [2315.90, 2325.40, 2312.60, 2322.70] },
  { date: '2024-07-23', value: [2322.70, 2335.10, 2320.80, 2330.20] },
  { date: '2024-07-24', value: [2330.20, 2325.60, 2315.40, 2320.50] },
  { date: '2024-07-25', value: [2320.50, 2330.80, 2318.90, 2325.30] },
  { date: '2024-07-26', value: [2325.30, 2340.10, 2322.20, 2338.40] },
  { date: '2024-07-29', value: [2338.40, 2342.90, 2318.70, 2327.88] },
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
