import { PageHeader } from '@/components/page-header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { MainChart } from '@/components/dashboard/main-chart';
import { SignalsPanel } from '@/components/dashboard/signals-panel';
import { GoldPairsTable } from '@/components/dashboard/gold-pairs-table';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <PageHeader 
          title="Dashboard" 
          description="Welcome back, here's your market overview."
        />
        <StatsCards />
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
