"use client";
import { PageHeader } from "@/components/page-header";
import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";
import { useEffect, useState } from "react";

export default function PredictionsPage() {
  const { priceData } = useTradingViewData();
  const [prediction, setPrediction] = useState<any>(null);
  const xauusd = priceData["OANDA:XAUUSD"];
  const hasLive = xauusd?.price !== undefined && xauusd?.price !== null;

  useEffect(() => {
    const fetchPrediction = async () => {
      if (!xauusd?.price) return;
      // Call your backend AI prediction endpoint with the live price
      const res = await fetch(
        `/api/ai-prediction?symbol=OANDA:XAUUSD&price=${xauusd.price}`
      );
      if (res.ok) {
        setPrediction(await res.json());
      } else {
        setPrediction(null);
      }
    };
    fetchPrediction();
  }, [xauusd?.price]);

  const hasPred = prediction && prediction.prediction;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="AI Predictions"
        description={
          hasLive && hasPred
            ? `Live XAU/USD: $${xauusd.price} | Prediction: ${prediction.prediction}`
            : hasLive
            ? `Live XAU/USD: $${xauusd.price}`
            : "No live data available"
        }
      />
      <div className="flex-1 p-4 md:p-8">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">
            AI Prediction for XAU/USD
          </div>
          <div className="text-2xl font-bold mb-2">
            {hasPred ? prediction.prediction : "No prediction available"}
          </div>
          <div className="mb-1">
            Target Price:{" "}
            {hasPred && prediction.target_price
              ? `$${prediction.target_price}`
              : "No data"}
          </div>
          <div className="mb-1">
            Stop Loss:{" "}
            {hasPred && prediction.stop_loss
              ? `$${prediction.stop_loss}`
              : "No data"}
          </div>
          <div className="mb-1">
            Confidence:{" "}
            {hasPred && prediction.confidence
              ? `${prediction.confidence}%`
              : "No data"}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {hasPred && prediction.reasoning ? prediction.reasoning : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
