import { PageHeader } from '@/components/page-header';
import { PredictionForm } from '@/components/predictions/prediction-form';

export default function PredictionsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="AI Predictions"
        description="Forecasts for short-term and medium-term movements."
      />
      <div className="flex-1 p-4 md:p-8">
        <PredictionForm />
      </div>
    </div>
  );
}
