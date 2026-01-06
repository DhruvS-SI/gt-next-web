'use client';

import Filter from './Filter';

// Example usage of the Filter component
export default function FilterExample() {
    const filters = [
        {
            id: 'skills',
            label: 'Filter By Skills',
            defaultValue: 'Batting',
            type: 'button',
            options: [
                { value: 'all', label: 'All' },
                { value: 'batting', label: 'Batting' },
                { value: 'bowling', label: 'Bowling' },
                { value: 'wicket-keeping', label: 'Wicket Keeping' },
                { value: 'all-rounder', label: 'All Rounder' },
            ],
        },
        {
            id: 'stats',
            label: 'Filter By Stats',
            defaultValue: 'Most Runs',
            type: 'button',
            options: [
                { value: 'all', label: 'All' },
                { value: 'most-runs', label: 'Most Runs' },
                { value: 'most-wickets', label: 'Most Wickets' },
                { value: 'best-average', label: 'Best Average' },
                { value: 'best-strike-rate', label: 'Best Strike Rate' },
            ],
        },
        {
            id: 'teams',
            label: 'Filter By Teams',
            defaultValue: 'All',
            type: 'button',
            options: [
                { value: 'all', label: 'All' },
                { value: 'team-a', label: 'Team A' },
                { value: 'team-b', label: 'Team B' },
                { value: 'team-c', label: 'Team C' },
            ],
        },
        {
            id: 'season',
            label: 'Filter By Season',
            defaultValue: 'All',
            type: 'link', // or 'button' depending on your needs
            options: [
                { value: 'all', label: 'All', href: '#' },
                { value: 'season-1', label: 'Season 1', href: '#' },
                { value: 'season-2', label: 'Season 2', href: '#' },
                { value: 'season-3', label: 'Season 3', href: '#' },
                { value: 'season-4', label: 'Season 4', href: '#' },
            ],
        },
    ];

    const handleApplyFilters = (selectedFilters) => {
        console.log('Applied filters:', selectedFilters);
        // Handle your filter logic here
        // Example: fetch data based on selectedFilters
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Filter 
                filters={filters} 
                onApplyFilters={handleApplyFilters}
                className="mb-8"
            />
            
            {/* Your content here */}
            <div className="mt-8">
                <p className="text-gray-600 dark:text-gray-400">
                    Your filtered content goes here...
                </p>
            </div>
        </div>
    );
}

