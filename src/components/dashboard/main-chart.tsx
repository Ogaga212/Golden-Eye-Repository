'use client';

import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { mainChartData } from '@/lib/data';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
  ma5: {
    label: 'MA 5',
    color: 'hsl(var(--accent))',
  },
};

export function MainChart() {
  const dataWithMA = mainChartData.map((d, i, arr) => {
    const sum = arr.slice(Math.max(0, i-4), i+1).reduce((acc, curr) => acc + curr.value[3], 0);
    return { ...d, ma5: i >= 4 ? sum / 5 : null };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>XAU/USD Price Movement</CardTitle>
        <CardDescription>Daily Open, High, Low, Close (OHLC)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ComposedChart
            data={dataWithMA}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                          <span className="font-bold text-foreground">{data.date}</span>
                        </div>
                         <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Close</span>
                          <span className="font-bold text-foreground">${data.value[3].toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Open</span>
                          <span className="font-bold text-muted-foreground">${data.value[0].toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">High</span>
                          <span className="font-bold text-muted-foreground">${data.value[1].toFixed(2)}</span>
                        </div>
                         <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Low</span>
                          <span className="font-bold text-muted-foreground">${data.value[2].toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">MA 5</span>
                          <span className="font-bold text-muted-foreground">${data.ma5?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <CandlestickChart dataKey="value" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
            <Line type="monotone" dataKey="ma5" stroke="hsl(var(--accent))" dot={false} strokeWidth={2} name="5-Day MA" />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// NOTE: CandlestickChart is not a standard Recharts component.
// This code assumes a custom component or a workaround using Bar.
// For a true candlestick chart, a library like 'react-financial-charts' would be needed.
// Here we are mocking it with a Bar chart to fit within existing dependencies.

const CustomCandle = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  const isBullish = close >= open;
  const fill = isBullish ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
  const wickStroke = fill;

  return (
    <g stroke={wickStroke} fill={fill} strokeWidth="1">
      <path d={`M ${x + width / 2},${y} L ${x + width / 2},${high}`} />
      <path d={`M ${x + width / 2},${y + height} L ${x + width / 2},${low}`} />
      <rect x={x} y={isBullish ? close : open} width={width} height={Math.abs(open - close)} />
    </g>
  );
};


// A basic implementation of Candlestick with Bar to make it work.
const CandlestickChart = ({ dataKey }: { dataKey: string }) => {
  return <Bar dataKey={dataKey} shape={props => {
    const {x, y, width, payload} = props;
    const [open, high, low, close] = payload[dataKey];
    const isUp = close > open;
    const color = isUp ? "hsl(var(--success))" : "hsl(var(--destructive))";

    return (
      <g>
        <line x1={x + width/2} y1={y} x2={x+width/2} y2={high} stroke={color} />
        <line x1={x + width/2} y1={y + Math.abs(open - close)} x2={x+width/2} y2={low} stroke={color} />
        <rect x={x} y={y} width={width} height={Math.abs(open - close)} fill={color} />
      </g>
    )
  }} />;
};
