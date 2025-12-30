import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
    base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    variants: {
        intent: {
            primary: 'bg-primary text-white hover:opacity-90',
            secondary: 'bg-secondary text-brand-blue hover:opacity-90',
            gradient1: 'bg-primary-gradient-1 text-white hover:opacity-90',
            gradient2: 'bg-secondary-gradient-1 text-brand-blue hover:opacity-90',
        },
        size: {
            sm: 'h-9 px-3 text-xs',
            md: 'h-10 px-4 py-2',
            lg: 'h-11 px-8 text-lg',
        },
    },
    defaultVariants: {
        intent: 'primary',
        size: 'md',
    },
});
