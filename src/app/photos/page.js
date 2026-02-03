'use client';

import { Article } from '@/components/reusable/Article';
import { useArticle } from '../../hooks/useArticle.js';

export default function Gallery() {
  const { articles: photos, loading } = useArticle('photos');

  if (loading) {
    return (
      <main className="container mx-auto px-16 py-8">
        <p>Loading...</p>
      </main>
    );
  }

  const firstTwoPhotos = photos.slice(0, 2);
  const remainingPhotos = photos.slice(2); // All remaining photos for 4x3 grid

  return (
    <main className="container mx-auto px-4 md:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Photos</h1>
      
      {/* First 2 photos - big, 2 in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {firstTwoPhotos.map((photo) => (
          <Article
            key={photo.id}
            {...photo}
            variant="overlay"
            width="1/2"
          />
        ))}
      </div>

      {/* Next photos - 4 photos per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {remainingPhotos.map((photo) => (
          <Article
            key={photo.id}
            {...photo}
            variant="overlay"
            width="1/4"
          />
        ))}
      </div>
    </main>
  );
}

