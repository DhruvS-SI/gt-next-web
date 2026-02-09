'use client';

import Link from 'next/link';
import { SocialShare } from '@/components/SocialShare';
import { articleStyles } from '@/lib/variants/article';
import { cn } from '@/lib/utils';

// Import gallery overrides (component handles override logic)
import { galleryOverrides } from '@/app/photos/galleryVariants';

export const Article = ({
  title,
  description,
  type,
  url,
  slug,
  thumbnail,
  videoUrl,
  mediaType = 'image',
  variant = 'default',
  width = 'full',
  className,
}) => {
  const baseStyles = articleStyles({ variant, width, mediaType });
  
  // Apply gallery overrides if available (higher priority)
  // Only apply for variants that exist in galleryOverrides (default, overlay)
  let thumbnailContainerClasses = baseStyles.thumbnailContainer();
  if (variant === 'default' || variant === 'overlay') {
    try {
      const overrideResult = galleryOverrides({ variant });
      if (overrideResult && overrideResult.thumbnailContainer) {
        // Merge override classes with base classes, preserving relative positioning
        thumbnailContainerClasses = cn(thumbnailContainerClasses, overrideResult.thumbnailContainer());
      }
    } catch (error) {
      // Gallery overrides not available, use base styles
      console.warn('Gallery overrides not applied:', error);
    }
  }
  
  const styles = baseStyles;

  // Determine href for navigation
  // Priority: slug > url (if it's a valid route)
  let href = null;
  if (slug) {
    // If slug exists, determine the route based on url or default to news
    if (url?.includes('/news/')) {
      href = `/news/${slug}`;
    } else if (url?.includes('/videos/')) {
      href = `/videos/${slug}`;
    } else if (url?.includes('/photos/')) {
      href = `/photos/${slug}`;
    } else {
      // Default to news if url doesn't indicate otherwise
      href = `/news/${slug}`;
    }
  } else if (url?.startsWith('/')) {
    // Use url directly if it's a valid route
    href = url;
  }

  const articleContent = (
    <article className={cn(styles.container(), className)}>
      {/* Split Content (for split variant - left side, shown first) */}
      {variant === 'split' && (
        <div className={cn(styles.content(), mediaType === 'video' ? 'py-[150px]' : 'py-4')}>
          {title && (
            <h3 className={styles.title()}>{title}</h3>
          )}
          {description && (
            <p className={styles.description()}>{description}</p>
          )}
          {/* Bottom container with type and share icon */}
          <div className={styles.bottomContainer()}>
            {type && (
              <span className={styles.type()}>{type}</span>
            )}
            <div className={styles.shareButtonContainer()}>
              <SocialShare url={url} title={title} />
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Container */}
      <div className={cn('!relative', thumbnailContainerClasses)}>
        {mediaType === 'video' && videoUrl ? (
          <video
            className={cn(styles.thumbnail(), '[&::-webkit-media-controls]:hidden [&::-webkit-media-controls-play-button]:hidden [&::-webkit-media-controls-start-playback-button]:hidden')}
            src={videoUrl}
            poster={thumbnail}
            controls={false}
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
          thumbnail && (
            <img
              src={thumbnail}
              alt={title || 'Article thumbnail'}
              className={styles.thumbnail()}
              loading="lazy"
            />
          )
        )}

        {/* Play button overlay for videos */}
        {mediaType === 'video' && videoUrl && (
          <div className={styles.playButton()}>
            <div className={styles.playButtonIcon()}>
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Overlay for overlay variant */}
        {variant === 'overlay' && <div className={styles.overlay()} />}

        {/* Overlay Content (for overlay variant) */}
        {variant === 'overlay' && (
          <div className={styles.overlayContent()}>
            {title && (
              <h3 className={styles.overlayTitle()}>{title}</h3>
            )}
            {/* Bottom container with type and share icon */}
            <div className={styles.overlayBottomContainer()}>
              {type && (
                <span className={styles.type()}>{type}</span>
              )}
              <div className={styles.shareButtonContainer()}>
                <SocialShare url={url} title={title} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Default Content (for default variant) */}
      {variant === 'default' && (
        <div className={styles.content()}>
          {title && (
            <h3 className={styles.title()}>{title}</h3>
          )}
          {/* Bottom container with type and share icon */}
          <div className={styles.bottomContainer()}>
            {type && (
              <span className={styles.type()}>{type}</span>
            )}
            <div className={styles.shareButtonContainer()}>
              <SocialShare url={url} title={title} />
            </div>
          </div>
        </div>
      )}
    </article>
  );

  // Wrap in Link if href is available
  if (href) {
    return (
      <Link href={href} className="block">
        {articleContent}
      </Link>
    );
  }

  return articleContent;
};

