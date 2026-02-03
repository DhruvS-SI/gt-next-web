'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/components/reusable/Article';
import { SocialShare } from '@/components/SocialShare';
import { useArticle } from '@/hooks/useArticle';
import { API_BASE, API_ENDPOINTS } from '@/lib/apiConfig';

export default function VideoDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { articles: allVideos } = useArticle('videos');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}${API_ENDPOINTS.VIDEOS}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }
        const videos = await response.json();
        const foundVideo = videos.find(
          (v) => v.slug === slug || v.url === `/videos/${slug}`
        );
        setVideo(foundVideo || null);
      } catch (error) {
        console.error('Error fetching video:', error);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchVideo();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full py-16 md:py-24 px-8 md:px-16 lg:px-12">
        <p>Loading...</p>
      </main>
    );
  }

  if (!video) {
    return (
      <main className="w-full py-16 md:py-24 px-8 md:px-16 lg:px-12">
        <p>Video not found</p>
      </main>
    );
  }

  // Get sidebar videos (excluding current video)
  const sidebarVideos = allVideos
    .filter((v) => v.id !== video.id)
    .slice(0, 4);

  // Get all videos for bottom section (excluding current video)
  const bottomVideos = allVideos.filter((v) => v.id !== video.id);

  // Get full URL for sharing
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="w-full py-16 md:py-24 px-8 md:px-16 lg:px-12">
      {/* Top Section: Video Detail (left) + Sidebar (right) */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full lg:w-[70%] order-1">
          {/* Video Player/Thumbnail */}
          <div className="mb-6">
            {video.videoUrl ? (
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  controls
                  preload="metadata"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {video.title}
            </h1>
            
            {video.description && (
              <div className="text-lg text-gray-700 mb-4 leading-relaxed">
                {video.description}
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4">
              {video.date && (
                <span className="text-sm text-gray-600">{video.date} {video.type}</span>
              )}
              <div className="flex items-center gap-3">
                <SocialShare url={shareUrl} title={video.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Vertical Video Listing (35%) */}
        <div className="w-full lg:w-[30%] order-2">
          <h2 className="text-xl font-bold mb-6 uppercase">Videos</h2>
          <div className="flex flex-col gap-4">
            {sidebarVideos.map((sidebarVideo) => (
              <Link
                key={sidebarVideo.id}
                href={`/videos/${sidebarVideo.slug || sidebarVideo.url.replace('/videos/', '')}`}
                className="block"
              >
                <div className="flex flex-row gap-3">
                  {/* Thumbnail - 30% */}
                  <div className="w-[30%] relative aspect-[4/3] overflow-hidden rounded-lg">
                    {sidebarVideo.videoUrl ? (
                      <video
                        className="w-full h-full object-cover"
                        src={sidebarVideo.videoUrl}
                        poster={sidebarVideo.thumbnail}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                    ) : (
                      <img
                        src={sidebarVideo.thumbnail}
                        alt={sidebarVideo.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Play button overlay */}
                    {sidebarVideo.mediaType === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <svg
                            className="w-5 h-5 text-primary ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content - 70% */}
                  <div className="w-[70%] flex flex-col justify-between min-h-[120px] py-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-3 mb-2 text-base">
                        {sidebarVideo.title}
                      </h3>
                      {sidebarVideo.type && (
                        <span className="text-xs text-gray-600 uppercase">{sidebarVideo.type}</span>
                      )}
                    </div>
                    <div className="flex justify-end mt-auto pt-2">
                      <SocialShare url={`${typeof window !== 'undefined' ? window.location.origin : ''}${sidebarVideo.url}`} title={sidebarVideo.title} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Complete Video Listing */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-8">More Videos</h2>
        
        {/* All videos - 4 videos per row with 4:3 aspect ratio */}
        {bottomVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottomVideos.map((bottomVideo) => (
              <Link
                key={bottomVideo.id}
                href={`/videos/${bottomVideo.slug || bottomVideo.url.replace('/videos/', '')}`}
                className="block"
              >
                <article className="flex flex-col overflow-hidden rounded-lg transition-all duration-300">
                  {/* Thumbnail Container - 16:9 aspect ratio */}
                  <div className="relative overflow-hidden w-full aspect-[16/9]">
                    {bottomVideo.videoUrl ? (
                      <video
                        className="w-full h-full object-cover"
                        src={bottomVideo.videoUrl}
                        poster={bottomVideo.thumbnail}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                    ) : (
                      <img
                        src={bottomVideo.thumbnail}
                        alt={bottomVideo.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Play button overlay */}
                    {bottomVideo.mediaType === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <svg
                            className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-4 py-2 relative flex flex-col min-h-[120px]">
                    {bottomVideo.title && (
                      <h3 className="font-semibold text-primary line-clamp-2 mb-2">{bottomVideo.title}</h3>
                    )}
                    {/* Bottom container with type and share icon */}
                    <div className="flex items-center justify-between w-full mt-auto pt-2">
                      {bottomVideo.type && (
                        <span className="text-xs font-medium uppercase tracking-wide text-primary/80">{bottomVideo.type}</span>
                      )}
                      <div className="[&_svg]:stroke-primary [&_button]:hover:bg-primary/10 [&_button]:text-primary">
                        <SocialShare url={`${typeof window !== 'undefined' ? window.location.origin : ''}${bottomVideo.url}`} title={bottomVideo.title} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

