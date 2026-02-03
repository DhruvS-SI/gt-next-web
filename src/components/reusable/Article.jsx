'use client';

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

  return (
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
};

