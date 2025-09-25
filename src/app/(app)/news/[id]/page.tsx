
import { notFound } from 'next/navigation';
import { newsArticles } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';

type NewsDetailPageProps = {
  params: { id: string };
};

const getArticleById = (id: string): NewsArticle | undefined => {
  return newsArticles.find((s) => s.id === id);
};

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
       <PageHeader
        title={article.title}
      >
        <Button variant="outline" asChild>
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </Button>
      </PageHeader>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Card>
            <CardHeader>
                 <div className="relative aspect-video w-full">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint={article.imageHint}
                  />
                </div>
            </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{article.source}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.timestamp).toLocaleString()}</span>
              </div>
            <p className="leading-relaxed">{article.summary}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
