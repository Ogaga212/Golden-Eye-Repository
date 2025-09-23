import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

export default function PredictionsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="AI Predictions"
        description="Forecasts for short-term and medium-term movements."
      />
      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-4">
              <BarChart2 className="h-12 w-12 text-muted-foreground" />
              <span>Feature Coming Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our AI-powered prediction models are being fine-tuned. This section will soon provide detailed forecasts and visualizations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
