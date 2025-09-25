import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { newsArticles } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Gold News"
        description="Latest news and analysis from the gold market."
      />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Card key={article.id} className="flex flex-col">
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
              <CardContent className="flex-1 space-y-2">
                <CardTitle className="text-lg leading-snug">
                  <Link href="#" className="hover:underline">
                    {article.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.summary}
                </p>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <span>{article.source}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.timestamp).toLocaleDateString()}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
