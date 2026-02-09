'use client';

import { Article } from '@/components/reusable/Article';
import { useArticle } from '@/hooks/useArticle';

export default function Videos() {
  const { articles: videos, loading } = useArticle('videos');

  if (loading) {
    return (
      <main className="container mx-auto px-16 py-8">
        <p>Loading...</p>
      </main>
    );
  }

  const firstVideo = videos.slice(0, 1);
  const remainingVideos = videos.slice(1); // All remaining videos for 4x3 grid

  return (
    <main className="container mx-auto px-4 md:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Videos</h1>
      
      {/* First video - split layout: thumbnail right (65%), content left (35%) */}
      <div className="mb-8">
        {firstVideo.map((video) => (
          <Article
            key={video.id}
            {...video}
            variant="split"
            width="full"
          />
        ))}
      </div>

      {/* Next videos - 4 videos per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {remainingVideos.map((video) => (
          <Article
            key={video.id}
            {...video}
            variant="default"
            width="1/4"
          />
        ))}
      </div>
    </main>
  );
}

