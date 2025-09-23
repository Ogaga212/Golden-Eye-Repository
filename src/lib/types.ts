export type Signal = {
  id: string;
  pair: string;
  type: 'Buy' | 'Sell' | 'Hold';
  timestamp: string;
  priceAtSignal: number;
  indicators: {
    rsi: number;
    macd: string;
    movingAverage: {
      shortTerm: number;
      longTerm: number;
    };
  };
  technicalIndicators: string;
};

export type GoldPair = {
  pair: string;
  price: number;
  change: number;
  changePercent: number;
};

export type EducationContent = {
  id: string;
  title: string;
  content: string;
};
