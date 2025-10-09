"use client";

import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function MainChart() {
  const { priceData } = useTradingViewData();
  const price = priceData["OANDA:XAUUSD"]?.price;
  const lastUpdate = priceData["OANDA:XAUUSD"]?.lastUpdate;

  return (
    <Card>
      <CardHeader>
        <CardTitle>XAU/USD Price Movement</CardTitle>
        <CardDescription>
          {price
            ? `Live price: $${price} (as of ${
                lastUpdate?.toLocaleTimeString() ?? ""
              })`
            : "No data available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full flex items-center justify-center text-2xl font-bold">
          {price !== undefined && price !== null
            ? `$${price}`
            : "No data available"}
        </div>
      </CardContent>
    </Card>
  );
}
