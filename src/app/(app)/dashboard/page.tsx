"use client";
import { PageHeader } from "@/components/page-header";
import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import TradingViewWidget from "@/components/dashboard/TradingViewWidget";
import { MainChart } from "@/components/dashboard/main-chart";
import { SignalsPanel } from "@/components/dashboard/signals-panel";
import { GoldPairsTable } from "@/components/dashboard/gold-pairs-table";
import { useRef, useEffect, useState } from "react";

export default function DashboardPage() {
  const { priceData } = useTradingViewData();
  // DEBUG: Log priceData to help diagnose 'No data' issue
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("DEBUG priceData:", priceData);
  }, [priceData]);

  const xauusd = priceData["OANDA:XAUUSD"];
  const xaugbp = priceData["OANDA:XAUGBP"];
  const xauchf = priceData["OANDA:XAUCHF"];
  const lastPriceRef = useRef<number | null>(null);
  const [xauchange, setXauchange] = useState(0);

  useEffect(() => {
    if (xauusd && xauusd.price != null) {
      if (lastPriceRef.current != null) {
        setXauchange(xauusd.price - lastPriceRef.current);
      }
      lastPriceRef.current = xauusd.price;
    }
  }, [xauusd?.price]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <PageHeader
          title="Dashboard"
          description={`Welcome back, here's your market overview. Live XAU/USD: $${
            xauusd?.price ?? "No data"
          }`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              XAU/USD Price
            </div>
            <div className="text-2xl font-bold">
              {xauusd?.price ? `$${xauusd.price}` : "No data"}
            </div>
            <div
              className={`mt-2 text-sm font-semibold ${
                xauchange > 0
                  ? "text-green-600"
                  : xauchange < 0
                  ? "text-red-600"
                  : "text-muted-foreground"
              }`}
            >
              {xauchange > 0 ? "+" : ""}
              {xauchange.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last update: {xauusd?.lastUpdate?.toLocaleTimeString() ?? "..."}
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              XAU/GBP Price
            </div>
            <div className="text-2xl font-bold">
              {xaugbp?.price ? `£${xaugbp.price}` : "No data"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last update: {xaugbp?.lastUpdate?.toLocaleTimeString() ?? "..."}
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              XAU/CHF Price
            </div>
            <div className="text-2xl font-bold">
              {xauchf?.price ? `Fr.${xauchf.price}` : "No data"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last update: {xauchf?.lastUpdate?.toLocaleTimeString() ?? "..."}
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Spread (USD/GBP)
            </div>
            <div className="text-2xl font-bold">
              {xauusd?.price && xaugbp?.price
                ? `$${(xauusd.price - xaugbp.price).toFixed(2)}`
                : "No data"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Live spread
            </div>
          </div>
        </div>
        <div className="my-4">
          <TradingViewWidget symbol="OANDA:XAUUSD" height={100} />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MainChart />
          </div>
          <div className="lg:col-span-1">
            <SignalsPanel />
          </div>
        </div>
        <GoldPairsTable />
      </div>
    </ScrollArea>
  );
}
