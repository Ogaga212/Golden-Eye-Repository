import { goldPairs } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

export function GoldPairsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gold Pairs Overview</CardTitle>
        <CardDescription>Live prices for major gold currency pairs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Change %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goldPairs.map((pair) => (
              <TableRow key={pair.pair}>
                <TableCell className="font-medium">{pair.pair}</TableCell>
                <TableCell className="text-right">{pair.price.toFixed(2)}</TableCell>
                <TableCell className={`flex items-center justify-end gap-1 text-right ${pair.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {pair.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {pair.change.toFixed(2)}
                </TableCell>
                <TableCell className={`text-right ${pair.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {pair.changePercent.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
