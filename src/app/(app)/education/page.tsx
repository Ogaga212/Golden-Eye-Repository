import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { educationContent } from '@/lib/data';

export default function EducationPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Education Center"
        description="Quick guides to help you get the most out of GoldenEye Signals."
      />
      <div className="flex-1 p-4 md:p-8">
        <Accordion type="single" collapsible className="w-full">
          {educationContent.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className="text-lg font-semibold">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
