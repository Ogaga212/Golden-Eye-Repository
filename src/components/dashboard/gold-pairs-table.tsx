"use client";
import { goldPairs } from "@/lib/data";
import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

export function GoldPairsTable() {
  const { priceData } = useTradingViewData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gold Pairs Overview</CardTitle>
        <CardDescription>
          Live prices for major gold currency pairs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goldPairs.map((pair) => {
              const symbol =
                pair.pair === "XAU/USD"
                  ? "OANDA:XAUUSD"
                  : pair.pair === "XAU/EUR"
                  ? "OANDA:XAUEUR"
                  : pair.pair === "XAU/GBP"
                  ? "OANDA:XAUGBP"
                  : pair.pair === "XAU/JPY"
                  ? "OANDA:XAUJPY"
                  : pair.pair === "XAU/CHF"
                  ? "OANDA:XAUCHF"
                  : "";
              const livePrice = priceData[symbol]?.price;
              return (
                <TableRow key={pair.pair}>
                  <TableCell className="font-medium">{pair.pair}</TableCell>
                  <TableCell className="text-right">
                    {livePrice ? livePrice.toFixed(2) : "Loading..."}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
