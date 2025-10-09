"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";

export function StatsCards() {
  const { priceData } = useTradingViewData();
  // Example: Only show real-time XAU/USD price, remove all mock stats
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          Live XAU/USD Price
        </div>
        <div className="text-2xl font-bold">
          {priceData["OANDA:XAUUSD"]?.price
            ? `$${priceData["OANDA:XAUUSD"]?.price}`
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}
