import { tv } from 'tailwind-variants';

export const fixtureCardStyles = tv({
  slots: {
    container: 'relative overflow-hidden w-full h-full',
    background: 'absolute inset-0 bg-primary-gradient-1 z-0',
    pattern: 'absolute inset-0 z-[1] opacity-30',
    content: 'relative z-[2] p-4 md:p-6 flex flex-col gap-4',
    header: 'flex justify-between items-center',
    location: 'text-white/80 text-xs md:text-sm flex-1 fixture-location-clamp',
    statusBadge: 'px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1.5',
    teamsSection: 'flex items-center justify-between gap-4',
    teamInfo: 'flex flex-col items-center gap-2 flex-1',
    teamLogo: 'w-12 h-12 md:w-14 md:h-14',
    teamScores: 'flex flex-col items-center',
    teamName: 'text-white text-xs md:text-sm font-medium',
    teamScore: 'text-white text-xl md:text-2xl font-bold',
    teamOvers: 'text-white/70 text-xs',
    vsSeparator: 'text-white/60 text-sm md:text-base font-medium',
    matchStatus: 'text-white text-sm md:text-base font-medium h-[3.5rem] fixture-status-clamp',
    matchInfo: 'text-white/70 text-xs md:text-sm text-center',
    matchBeginTime: 'text-white/70 text-xs md:text-sm text-center min-h-[1.5rem] max-h-[1.5rem] flex items-center justify-center leading-none',
    actionButton: 'w-full py-2.5 md:py-3 rounded-md font-semibold text-sm md:text-base transition-opacity hover:opacity-90 text-center flex items-center justify-center',
    countdownContainer: 'flex items-center justify-center gap-3 md:gap-4 h-[3.5rem]',
    countdownItem: 'flex flex-col items-center',
    countdownValue: 'text-white text-xl md:text-2xl font-bold',
    countdownLabel: 'text-white/70 text-xs uppercase tracking-wider',
    recentScores: 'flex flex-col gap-1',
    recentScoreLine: 'text-white text-xs md:text-sm',
  },
  variants: {
    variant: {
      upcoming: {
        statusBadge: 'bg-gray-600 text-white',
        actionButton: 'bg-secondary-gradient-1 text-primary',
        matchInfo: 'text-white/70 text-xs md:text-sm text-center mt-0 mb-[8px]',
      },
      live: {
        statusBadge: 'bg-green-500 text-white',
        actionButton: 'bg-secondary-gradient-1 text-primary',
        matchInfo: 'text-white/70 text-xs md:text-sm text-center',
      },
      recent: {
        statusBadge: 'bg-red-500 text-white',
        actionButton: 'bg-secondary-gradient-1 text-primary',
        matchInfo: 'text-white/70 text-xs md:text-sm text-center',
      },
    },
    rounded: {
      true: {
        container: 'rounded-lg',
      },
      false: {
        container: 'rounded-none',
      },
    },
  },
  defaultVariants: {
    variant: 'upcoming',
    rounded: true,
  },
});
