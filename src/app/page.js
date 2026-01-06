'use client';

import { buttonStyles } from "@/lib/variants/button";
import Filter from "@/components/reusable/Filter";

export default function Home() {
  const sampleFilters = [
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
        { value: 'gt', label: 'Gujarat Titans' },
        { value: 'mi', label: 'Mumbai Indians' },
        { value: 'csk', label: 'Chennai Super Kings' },
      ],
    },
    {
      id: 'season',
      label: 'Filter By Season',
      defaultValue: 'All',
      type: 'button',
      options: [
        { value: 'all', label: 'All' },
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
      ],
    },
  ];

  const handleApplyFilters = (selectedFilters) => {
    console.log('Applied filters:', selectedFilters);
  };

  return (
    <main className="min-h-screen p-24 bg-slate-50">
      <h1 className="text-4xl font-bold text-sky-600 mb-8">Gujarat Titans</h1>

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Filter Component Demo</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Filter 
              filters={sampleFilters} 
              onApplyFilters={handleApplyFilters}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Gradient Buttons (via Tailwind Variants)</h2>
          <div className="flex gap-4 flex-wrap">
            <button className={buttonStyles({ intent: "gradient1", size: "lg" })}>
              Primary Gradient
            </button>
            <button className={buttonStyles({ intent: "gradient2", size: "lg" })}>
              Secondary Gradient
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Standard Variants</h2>
          <div className="flex gap-4 flex-wrap">
            <button className={buttonStyles({ intent: "primary" })}>
              Primary
            </button>
            <button className={buttonStyles({ intent: "secondary" })}>
              Secondary
            </button>
          </div>
        </section>
      </div>

      <p className="mt-12 text-sm text-slate-500 italic">
        Testing Tailwind v4 + Tailwind Variants setup
      </p>
    </main>
  );
}

