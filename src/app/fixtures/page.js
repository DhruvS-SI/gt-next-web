'use client';

import { useState, useMemo } from 'react';
import FixtureCard from '@/components/reusable/FixtureCard';
import Filter from '@/components/reusable/Filter';
import db from '@/data/db.json';
import Link from 'next/link';

export default function FixturesListingPage() {
  const [filteredFixtures, setFilteredFixtures] = useState(db.fixtures);

  // Extract unique options
  const filterOptions = useMemo(() => {
    const seasons = new Set();
    const teams = new Set();
    
    db.fixtures.forEach(fixture => {
      // Extract year from matchDate for season
      if (fixture.matchDate) {
        const year = new Date(fixture.matchDate).getFullYear();
        seasons.add(String(year));
      }
      
      // Extract teams
      if (fixture.team1?.name) teams.add(fixture.team1.name);
      if (fixture.team2?.name) teams.add(fixture.team2.name);
    });

    return {
      seasons: Array.from(seasons).sort().reverse().map(year => ({ value: year, label: year })),
      teams: Array.from(teams).sort().map(team => ({ value: team, label: team }))
    };
  }, []);

  const filters = [
    {
      id: 'season',
      label: 'Season',
      defaultValue: 'All',
      type: 'button',
      options: [
        { value: 'all', label: 'All' },
        ...filterOptions.seasons
      ]
    },
    {
      id: 'status',
      label: 'Status',
      defaultValue: 'All',
      type: 'button',
      options: [
        { value: 'all', label: 'All' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'live', label: 'Live' },
        { value: 'recent', label: 'Recent' }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      defaultValue: 'All',
      type: 'button',
      options: [
        { value: 'all', label: 'All' },
        ...filterOptions.teams
      ]
    }
  ];

  const handleApplyFilters = (selectedFilters) => {
    let result = db.fixtures;

    if (selectedFilters.season && selectedFilters.season !== 'all') {
      result = result.filter(f => {
         const year = new Date(f.matchDate).getFullYear();
         return String(year) === selectedFilters.season;
      });
    }

    if (selectedFilters.status && selectedFilters.status !== 'all') {
      result = result.filter(f => f.variant === selectedFilters.status);
    }

    if (selectedFilters.team && selectedFilters.team !== 'all') {
      result = result.filter(f => 
        f.team1.name === selectedFilters.team || 
        f.team2.name === selectedFilters.team
      );
    }

    setFilteredFixtures(result);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Fixtures</h1>
        
        <Filter 
          filters={filters} 
          onApplyFilters={handleApplyFilters}
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFixtures.length > 0 ? (
            filteredFixtures.map((fixture) => (
              <div key={fixture.id} className="block transition-transform hover:scale-[1.02]">
              <FixtureCard fixture={fixture} variant={fixture.variant} />
            </div>
            ))
          ) : (
             <div className="col-span-full text-center text-gray-400 py-12">
               No fixtures found matching your filters.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
