import { tv } from 'tailwind-variants';

export const tableStyles = tv({
  slots: {
    container: 'overflow-x-auto rounded-lg',
    table: 'w-full border-collapse',
    thead: '',
    headerRow: '',
    headerCell: 'text-[10px] md:text-xs uppercase tracking-tight md:tracking-wider font-medium',
    tbody: '',
    bodyRow: 'transition-colors',
    bodyCell: 'text-[11px] md:text-sm ',
    emptyState: 'py-12 text-center',
    loadMoreButton: 'px-8 py-2 bg-secondary-gradient-1 text-primary font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed',
    loadMoreContainer: 'flex justify-center py-4',
  },
  variants: {
    theme: {
      default: {
        container: 'bg-white',
        headerRow: 'bg-primary',
        headerCell: 'text-white',
        tbody: 'divide-y divide-primary/10',
        bodyRow: 'bg-white',
        bodyCell: 'text-primary',
        emptyState: 'text-primary/50',
      },
      dark: {
        container: 'bg-primary',
        headerRow: 'bg-accent',
        headerCell: 'text-secondary',
        tbody: 'divide-y divide-accent/50',
        bodyRow: '',
        bodyCell: 'text-white',
        emptyState: 'text-secondary/50',
      },
    },
    size: {
      compact: {
        headerCell: 'px-1 py-1.5 md:px-3 md:py-2.5',
        bodyCell: 'px-1 py-1.5 md:px-3 md:py-3',
      },
      default: {
        headerCell: 'px-1.5 py-2 md:px-4 md:py-4',
        bodyCell: 'px-1.5 py-2 md:px-4 md:py-4',
      },
      spacious: {
        headerCell: 'px-2 py-2.5 md:px-6 md:py-5',
        bodyCell: 'px-2 py-2.5 md:px-6 md:py-5',
      },
    },
    stickyHeader: {
      true: {
        thead: 'sticky top-0 z-10',
      },
    },
    columnDividers: {
      true: {
        headerCell: 'border-r border-primary/20 last:border-r-0',
        bodyCell: 'border-r border-primary/10 last:border-r-0',
      },
      dark: {
        headerCell: 'border-r border-white/10 last:border-r-0',
        bodyCell: 'border-r border-white/10 last:border-r-0',
      },
    },
  },
  defaultVariants: {
    theme: 'default',
    size: 'default',
    stickyHeader: false,
    columnDividers: false,
  },
});

// Row highlight variants for special states (qualified teams, etc.)
export const tableRowHighlight = tv({
  base: '',
  variants: {
    highlight: {
      none: '',
      gold: 'bg-gradient-to-r from-secondary/30 to-transparent',
      success: 'bg-gradient-to-r from-success/20 to-transparent',
      warning: 'bg-gradient-to-r from-warning/20 to-transparent',
    },
  },
  defaultVariants: {
    highlight: 'none',
  },
});

// Alignment utility
export const cellAlignment = tv({
  base: '',
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

