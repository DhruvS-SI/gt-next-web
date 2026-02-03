'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Article } from '@/components/reusable/Article';
import { SocialShare } from '@/components/SocialShare';
import { useArticle } from '@/hooks/useArticle';
import { API_BASE, API_ENDPOINTS } from '@/lib/apiConfig';

export default function NewsDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { articles: allArticles } = useArticle('articles');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}${API_ENDPOINTS.ARTICLES}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const articles = await response.json();
        const foundArticle = articles.find(
          (a) => a.slug === slug || a.url === `/news/${slug}`
        );
        setArticle(foundArticle || null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full py-16 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="w-[60%] mx-auto">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="w-full py-16 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="w-[60%] mx-auto">
          <p>Article not found</p>
        </div>
      </main>
    );
  }

  // Get 4 related articles (excluding current article)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  // Get full URL for sharing
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="w-full py-16 md:py-24 px-8 md:px-16 lg:px-12">
      <div className="w-[70%] mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          {article.description && (
            <div
              className="text-lg text-gray-700 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          )}

          <div className="flex items-center justify-between flex-wrap gap-4">
            {article.date && (
              <span className="text-sm text-gray-600">{article.date}</span>
            )}
            <div className="flex items-center gap-3">
              <SocialShare url={shareUrl} title={article.title} />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8 relative">
            <div className="border-4 border-primary p-2 relative bg-primary/5">
              {/* Decorative dots on left */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              {/* Decorative dots on right */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" className="text-primary"/>
                </svg>
              </div>
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto object-cover relative z-0"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        {article.content && (
          <div className="mb-12">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        )}
      </div>

      {/* Related Articles - Horizontal 4 Cards - Full Width */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 w-full">
          <div className="w-full px-8 md:px-16 lg:px-12 mb-6">
            <h2 className="text-2xl font-bold">Related News</h2>
          </div>
          <div className="w-full px-8 md:px-16 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedArticles.map((relatedArticle) => (
                <Article
                  key={relatedArticle.id}
                  {...relatedArticle}
                  variant="default"
                  width="1/4"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

