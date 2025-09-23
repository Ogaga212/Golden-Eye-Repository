import type { GoldPair, Signal, EducationContent } from './types';

export const goldPairs: GoldPair[] = [
  { pair: 'XAU/USD', price: 2376.55, change: 12.33, changePercent: 0.52 },
  { pair: 'XAU/EUR', price: 2215.21, change: -5.41, changePercent: -0.24 },
  { pair: 'XAU/GBP', price: 1875.99, change: 10.12, changePercent: 0.54 },
  { pair: 'XAU/JPY', price: 372510.5, change: 850.5, changePercent: 0.23 },
  { pair: 'XAU/CHF', price: 2130.40, change: -3.15, changePercent: -0.15 },
];

export const signals: Signal[] = [
  {
    id: '1',
    pair: 'XAU/USD',
    type: 'Buy',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    priceAtSignal: 2375.80,
    indicators: { rsi: 33.5, macd: '-0.55 (bullish crossover impending)', movingAverage: { shortTerm: 2376.20, longTerm: 2378.10 } },
    technicalIndicators: 'RSI is at 33.5, indicating it is approaching oversold. MACD is at -0.55, showing potential for a bullish crossover. Short-term MA is below long-term MA.'
  },
  {
    id: '2',
    pair: 'XAU/EUR',
    type: 'Sell',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 2220.60,
    indicators: { rsi: 70.2, macd: '1.25 (bearish divergence)', movingAverage: { shortTerm: 2219.80, longTerm: 2217.40 } },
    technicalIndicators: 'RSI is at 70.2, indicating it is overbought. MACD is at 1.25 and shows a bearish divergence pattern. Short-term MA is above long-term MA.'
  },
  {
    id: '3',
    pair: 'XAU/GBP',
    type: 'Hold',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 1868.50,
    indicators: { rsi: 52.1, macd: '0.15 (neutral)', movingAverage: { shortTerm: 1868.20, longTerm: 1869.00 } },
    technicalIndicators: 'RSI is at 52.1, which is in the neutral zone. MACD is at 0.15, indicating no strong momentum. Moving averages are tight, suggesting consolidation.'
  },
  {
    id: '4',
    pair: 'XAU/JPY',
    type: 'Buy',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 371980.0,
    indicators: { rsi: 35.5, macd: '-150.0 (converging)', movingAverage: { shortTerm: 372100.0, longTerm: 372500.0 } },
    technicalIndicators: 'RSI is at 35.5, approaching oversold levels. MACD is at -150.0 and the lines are converging, hinting at a potential upward move.'
  },
    {
    id: '5',
    pair: 'XAU/USD',
    type: 'Sell',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 2385.20,
    indicators: { rsi: 76.8, macd: '2.30 (overextended)', movingAverage: { shortTerm: 2384.50, longTerm: 2382.10 } },
    technicalIndicators: 'RSI is at 76.8, in overbought territory, suggesting a reversal is likely. MACD is at 2.30, indicating the trend may be overextended.'
  },
];

const generateRecentChartData = (days: number, initialPrice: number): { date: string; value: number[] }[] => {
  const data = [];
  let currentDate = new Date();
  let currentPrice = initialPrice;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);

    const volatility = 0.01; // 1% volatility
    const trend = (Math.random() - 0.48) * 0.005; // slight overall trend
    
    const open = currentPrice;
    const high = open * (1 + Math.random() * volatility);
    const low = open * (1 - Math.random() * volatility);
    const close = low + (high - low) * Math.random();

    data.push({
      date: date.toISOString().split('T')[0],
      value: [
        parseFloat(open.toFixed(2)),
        parseFloat(high.toFixed(2)),
        parseFloat(low.toFixed(2)),
        parseFloat(close.toFixed(2))
      ],
    });
    
    currentPrice = close * (1 + trend);
  }
  
  // Ensure the last close price matches the goldPairs data
  const finalDataPoint = data[data.length - 1];
  const priceDiff = goldPairs[0].price - finalDataPoint.value[3];
  finalDataPoint.value = finalDataPoint.value.map(v => parseFloat((v + priceDiff).toFixed(2))) as [number, number, number, number];


  return data;
};


export const mainChartData = generateRecentChartData(30, 2350);


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
