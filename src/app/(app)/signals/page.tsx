"use client";
import { PageHeader } from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { signals } from "@/lib/data";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useTradingViewData } from "@/components/dashboard/TradingViewDataProvider";

const getBadgeVariant = (
  type: "Buy" | "Sell" | "Hold"
): "success" | "destructive" | "secondary" => {
  if (type === "Buy") return "success";
  if (type === "Sell") return "destructive";
  return "secondary";
};

export default function SignalsPage() {
  const { priceData } = useTradingViewData();
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Trading Signals"
        description={`A complete history of all generated signals. Live XAU/USD: $${
          priceData["OANDA:XAUUSD"]?.price ?? "Loading..."
        }`}
      />
      <div className="flex-1 p-4 md:p-8">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Live Price</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {signals.map((signal) => {
                  const symbol =
                    signal.pair === "XAU/USD"
                      ? "OANDA:XAUUSD"
                      : signal.pair === "XAU/EUR"
                      ? "OANDA:XAUEUR"
                      : signal.pair === "XAU/GBP"
                      ? "OANDA:XAUGBP"
                      : signal.pair === "XAU/JPY"
                      ? "OANDA:XAUJPY"
                      : signal.pair === "XAU/CHF"
                      ? "OANDA:XAUCHF"
                      : "";
                  const livePrice = priceData[symbol]?.price;
                  return (
                    <TableRow key={signal.id}>
                      <TableCell>
                        {new Date(signal.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {signal.pair}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(signal.type)}>
                          {signal.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {livePrice ? `$${livePrice.toFixed(2)}` : "Loading..."}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/signals/${signal.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
