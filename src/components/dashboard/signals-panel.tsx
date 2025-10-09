"use client";
import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function SignalsPanel() {
  const { priceData } = useTradingViewData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Signals</CardTitle>
        <CardDescription>
          Live XAU/USD:{" "}
          {priceData["OANDA:XAUUSD"]?.price
            ? `$${priceData["OANDA:XAUUSD"]?.price}`
            : "Loading..."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Optionally, you can remove or update the signals list to use only real-time data if available */}
      </CardContent>
    </Card>
  );
}
