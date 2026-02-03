import { tv } from 'tailwind-variants';

// Gallery-specific overrides - 16:9 aspect ratio
export const galleryOverrides = tv({
  slots: {
    thumbnailContainer: '',
  },
  variants: {
    variant: {
      default: {
        thumbnailContainer: 'aspect-[16/9]',
      },
      overlay: {
        thumbnailContainer: 'aspect-[16/9]',
      },
    },
  },
});

