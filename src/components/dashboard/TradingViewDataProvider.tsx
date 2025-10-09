"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface PriceData {
  symbol: string;
  price: number | null;
  lastUpdate: Date | null;
}

interface AiPrediction {
  prediction: string;
  target_price: number;
  stop_loss: number;
  confidence: number;
  reasoning: string;
}

interface TradingViewDataContextProps {
  priceData: Record<string, PriceData>;
  aiPrediction: Record<string, AiPrediction | null>;
}

const TradingViewDataContext = createContext<
  TradingViewDataContextProps | undefined
>(undefined);

const PAIRS = [
  { symbol: "OANDA:XAUUSD", quote: "USD" },
  { symbol: "OANDA:XAUEUR", quote: "EUR" },
  { symbol: "OANDA:XAUGBP", quote: "GBP" },
  { symbol: "OANDA:XAUJPY", quote: "JPY" },
  { symbol: "OANDA:XAUCHF", quote: "CHF" },
];

export const TradingViewDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [priceData, setPriceData] = useState<Record<string, PriceData>>({});
  const [aiPrediction, setAiPrediction] = useState<
    Record<string, AiPrediction | null>
  >({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setError(null);
        const apiKey = process.env.NEXT_PUBLIC_METALPRICE_API_KEY;
        const symbols = PAIRS.map((p) => p.quote).join(",");
        const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=XAU&currencies=${symbols}`;
        const res = await fetch(url);
        const data = await res.json();
        // Debug log
        // eslint-disable-next-line no-console
        console.log("[MetalpriceAPI] url:", url, "response:", data);
        if (data && data.success && data.rates) {
          const newPriceData: Record<string, PriceData> = {};
          const newAiPrediction: Record<string, AiPrediction | null> = {};
          PAIRS.forEach((pair) => {
            const price = data.rates[pair.quote] ?? null;
            newPriceData[pair.symbol] = {
              symbol: pair.symbol,
              price,
              lastUpdate: new Date(),
            };
          });
          setPriceData(newPriceData);
          await Promise.all(
            PAIRS.map(async (pair) => {
              const price = newPriceData[pair.symbol].price;
              if (price !== null) {
                const aiRes = await fetch(
                  `/api/ai-prediction?symbol=${pair.symbol}&price=${price}`
                );
                newAiPrediction[pair.symbol] = aiRes.ok
                  ? await aiRes.json()
                  : null;
              } else {
                newAiPrediction[pair.symbol] = null;
              }
            })
          );
          setAiPrediction(newAiPrediction);
        } else {
          setError(data?.error?.message || "Failed to fetch metal prices.");
          setPriceData({});
        }
      } catch (err) {
        setError((err as Error).message || "Unknown error fetching metal prices.");
        setPriceData({});
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TradingViewDataContext.Provider value={{ priceData, aiPrediction }}>
      {error && (
        <div style={{ color: 'red', padding: 8, fontWeight: 'bold' }}>
          Metalprice API error: {error}
        </div>
      )}
      {children}
    </TradingViewDataContext.Provider>
  );
};

export const useTradingViewData = () => {
  const context = useContext(TradingViewDataContext);
  if (!context)
    throw new Error(
      "useTradingViewData must be used within TradingViewDataProvider"
    );
  return context;
};
