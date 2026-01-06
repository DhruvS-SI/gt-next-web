import { tv } from 'tailwind-variants';

export const fallOfWicketsVariants = tv({
  slots: {
    score: 'font-semibold text-primary',
    separator: 'text-primary/60 text-xs',
    wicketNumber: 'text-primary/60 text-xs',
    playerName: 'text-primary',
    playerBadge: 'text-primary/60 text-xs ml-1',
    over: 'text-primary/60',
  },
});

