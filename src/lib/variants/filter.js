import { tv } from 'tailwind-variants';

export const filterButton = tv({
    base: [
        'inline-flex items-center justify-center gap-2',
        'px-4 py-2.5 rounded-lg',
        'font-medium text-sm',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
    ],
    variants: {
        variant: {
            more: [
                'bg-gray-100 dark:bg-gray-800',
                'text-gray-900 dark:text-white',
                'hover:bg-gray-200 dark:hover:bg-gray-700',
                'focus:ring-gray-500',
            ],
            reset: [
                'bg-white dark:bg-gray-900',
                'text-gray-700 dark:text-gray-300',
                'border border-gray-300 dark:border-gray-600',
                'hover:bg-gray-50 dark:hover:bg-gray-800',
                'focus:ring-gray-500',
            ],
            apply: [
                'bg-yellow-500 dark:bg-yellow-600',
                'text-gray-900 dark:text-white',
                'hover:bg-yellow-600 dark:hover:bg-yellow-700',
                'focus:ring-yellow-500',
                'shadow-sm',
            ],
            cancel: [
                'text-gray-900 dark:text-white',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'focus:ring-gray-500',
            ],
        },
    },
    defaultVariants: {
        variant: 'more',
    },
});

export const filterModal = tv({
    base: [
        'fixed inset-0 z-50',
        'flex items-end md:items-center justify-center',
    ],
});

