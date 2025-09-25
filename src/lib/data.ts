import type { GoldPair, Signal, EducationContent, NewsArticle } from './types';

export const goldPairs: GoldPair[] = [
  { pair: 'XAU/USD', price: 2320.55, change: -5.12, changePercent: -0.22 },
  { pair: 'XAU/EUR', price: 2155.80, change: 2.75, changePercent: 0.13 },
  { pair: 'XAU/GBP', price: 1842.30, change: -8.45, changePercent: -0.46 },
  { pair: 'XAU/JPY', price: 368540.0, change: 1250.0, changePercent: 0.34 },
  { pair: 'XAU/CHF', price: 2105.10, change: -1.90, changePercent: -0.09 },
];

export const signals: Signal[] = [
  {
    id: '1',
    pair: 'XAU/USD',
    type: 'Buy',
    timestamp: new Date().toISOString(),
    priceAtSignal: 2321.10,
    indicators: { rsi: 34.2, macd: '-0.45 (bullish crossover upcoming)', movingAverage: { shortTerm: 2322.50, longTerm: 2324.00 } },
    technicalIndicators: 'RSI is near oversold at 34.2. MACD histogram is showing bullish divergence.'
  },
  {
    id: '2',
    pair: 'XAU/EUR',
    type: 'Sell',
    timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 2154.50,
    indicators: { rsi: 68.9, macd: '1.15 (bearish divergence forming)', movingAverage: { shortTerm: 2153.00, longTerm: 2151.20 } },
    technicalIndicators: 'RSI at 68.9, nearing overbought territory. A bearish divergence is appearing on the MACD.'
  },
  {
    id: '3',
    pair: 'XAU/GBP',
    type: 'Hold',
    timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 1850.75,
    indicators: { rsi: 51.5, macd: '0.05 (neutral)', movingAverage: { shortTerm: 1850.50, longTerm: 1850.90 } },
    technicalIndicators: 'RSI is neutral at 51.5. MACD is flat, indicating consolidation. Moving averages are tightly coiled.'
  },
  {
    id: '4',
    pair: 'XAU/JPY',
    type: 'Buy',
    timestamp: new Date(new Date().getTime() - 8 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 367300.0,
    indicators: { rsi: 38.0, macd: '-120.0 (momentum turning)', movingAverage: { shortTerm: 367500.0, longTerm: 368000.0 } },
    technicalIndicators: 'RSI is low at 38.0. MACD is beginning to show signs of a bullish turnaround.'
  },
    {
    id: '5',
    pair: 'XAU/USD',
    type: 'Sell',
    timestamp: new Date(new Date().getTime() - 12 * 60 * 60 * 1000).toISOString(),
    priceAtSignal: 2328.40,
    indicators: { rsi: 72.1, macd: '2.10 (overbought)', movingAverage: { shortTerm: 2327.00, longTerm: 2325.00 } },
    technicalIndicators: 'RSI is high at 72.1, indicating an overbought condition and potential for a pullback.'
  },
];

const generateRecentChartData = (days: number, initialPrice: number): { date: string; value: number[] }[] => {
  const data = [];
  let currentDate = new Date();
  let currentPrice = initialPrice;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);

    const volatility = 0.015; 
    const trend = (Math.random() - 0.49) * 0.006; 
    
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
  
  const finalDataPoint = data[data.length - 1];
  const priceDiff = goldPairs[0].price - finalDataPoint.value[3];
  data.forEach(d => {
    d.value = d.value.map(v => parseFloat((v + priceDiff).toFixed(2))) as [number, number, number, number];
  });


  return data;
};


export const mainChartData = generateRecentChartData(30, 2335);


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
        title: 'Using the App',
        content: 'The Dashboard provides a real-time overview. The Signals page lists all historical signals for your review. The Prediction page offers AI-driven forecasts. Use the Education section to enhance your trading knowledge. Manage your profile and notification settings in the Profile section.'
    }
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Gold Prices Surge as Inflation Fears Mount',
    source: 'Financial Times',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    summary: 'Gold prices have seen a significant increase over the past week as investors seek safe-haven assets amid rising inflation concerns and geopolitical tensions.',
    imageUrl: 'https://picsum.photos/seed/news1/600/400',
    imageHint: 'gold bars'
  },
  {
    id: 'news-2',
    title: 'Central Banks Continue to Build Gold Reserves',
    source: 'Bloomberg',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    summary: 'A new report shows that central banks around the world have continued to increase their gold holdings, signaling a long-term bullish outlook for the precious metal.',
    imageUrl: 'https://picsum.photos/seed/news2/600/400',
    imageHint: 'bank vault'
  },
  {
    id: 'news-3',
    title: 'Technical Analysis: Is Gold Overbought?',
    source: 'Reuters',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    summary: 'Analysts are divided on whether the recent rally in gold prices is sustainable. Technical indicators suggest that gold may be entering overbought territory.',
    imageUrl: 'https://picsum.photos/seed/news3/600/400',
    imageHint: 'stock chart'
  },
    {
    id: 'news-4',
    title: 'How a Stronger Dollar Could Impact Gold Prices',
    source: 'Wall Street Journal',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    summary: 'The recent strengthening of the US dollar could pose a headwind for gold prices. This article explores the historical relationship between the two assets.',
    imageUrl: 'https://picsum.photos/seed/news4/600/400',
    imageHint: 'dollar gold'
  },
  {
    id: 'news-5',
    title: 'Gold Mining Stocks Rally on Higher Prices',
    source: 'MarketWatch',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    summary: 'Shares of major gold mining companies have rallied this week, boosted by the sustained increase in the price of gold and positive earnings reports.',
    imageUrl: 'https://picsum.photos/seed/news5/600/400',
    imageHint: 'mining equipment'
  },
  {
    id: 'news-6',
    title: 'Analysts Predict Gold to Reach $2,500 by Year-End',
    source: 'The Economist',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    summary: 'Several prominent financial analysts are forecasting that gold could reach as high as $2,500 per ounce by the end of the year, citing a confluence of macroeconomic factors.',
    imageUrl: 'https://picsum.photos/seed/news6/600/400',
    imageHint: 'crystal ball'
  }
];
