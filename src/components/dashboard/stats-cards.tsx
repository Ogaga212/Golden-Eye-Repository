import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

const stats = [
  {
    title: 'XAU/USD',
    value: '2320.55',
    change: -0.23,
    icon: ArrowDown,
    color: 'text-destructive',
  },
  {
    title: 'Total Signals Today',
    value: '5',
    change: 2,
    icon: ArrowUp,
    color: 'text-success',
  },
  {
    title: 'Active Buy Signals',
    value: '2',
    change: 0,
    icon: Minus,
    color: 'text-muted-foreground',
  },
  {
    title: 'Market Sentiment',
    value: 'Neutral',
    change: -5,
    changeLabel: ' from Cautious',
    icon: ArrowDown,
    color: 'text-muted-foreground',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change !== 0 && (
                <span className={stat.color}>{stat.change > 0 ? '+' : ''}{stat.change}{stat.changeLabel ? '' : '%'}</span>
              )}
              {stat.changeLabel || ' from last day'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
