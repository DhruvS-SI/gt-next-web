import { tv } from 'tailwind-variants';

export const battingScorecardVariants = tv({
  slots: {
    playerName: 'font-semibold text-primary',
    playerBadge: 'text-primary/60 text-xs',
    trendIcon: 'text-xs',
    dismissal: 'text-primary/60 text-xs mt-1',
    dismissalItalic: 'text-primary/60 text-xs italic mt-1',
  },
  variants: {
    trend: {
      up: {
        trendIcon: 'text-success',
      },
      down: {
        trendIcon: 'text-warning',
      },
    },
  },
});

