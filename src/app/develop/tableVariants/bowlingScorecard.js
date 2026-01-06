import { tv } from 'tailwind-variants';

export const bowlingScorecardVariants = tv({
  slots: {
    bowlerName: 'font-semibold text-primary',
    trendIcon: 'text-xs',
    wickets: 'font-medium',
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

