'use client';

import { Article } from '@/components/reusable/Article';
import { useArticle } from '@/hooks/useArticle.js';

export default function News() {
  const { articles, loading } = useArticle('articles');

  if (loading) {
    return (
      <main className="container mx-auto px-16 py-8">
        <p>Loading...</p>
      </main>
    );
  }
  const firstTwoArticles = articles.slice(0, 2);
  const remainingArticles = articles.slice(2); // All remaining articles for 4x3 grid

  return (
    <main className="container mx-auto px-4 md:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      
      {/* First 2 articles - big, 2 in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {firstTwoArticles.map((article) => (
          <Article
            key={article.id}
            {...article}
            variant="default"
            width="1/2"
          />
        ))}
      </div>

      {/* Next 12 articles - 4 articles per row, 3 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {remainingArticles.map((article) => (
          <Article
            key={article.id}
            {...article}
            variant="default"
            width="1/4"
          />
        ))}
      </div>
    </main>
  );
}

