import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility functions will go here

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Utility function to merge Tailwind CSS classes
 * @param {...(string|object|undefined|null)} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

