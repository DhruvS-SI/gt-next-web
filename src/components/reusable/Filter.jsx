'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { filterButton, filterModal } from '@/lib/variants/filter';

export default function Filter({ filters = [], onApplyFilters, className }) {
    const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({});

    // Desktop filters (first 2) and More filters (rest)
    const desktopFilters = filters.slice(0, 2);
    const moreFilters = filters.slice(2);

    const handleFilterSelect = (filterId, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterId]: value
        }));
    };

    const handleApplyFilters = () => {
        onApplyFilters?.(selectedFilters);
        setIsMoreFiltersOpen(false);
    };

    const handleResetFilters = () => {
        setSelectedFilters({});
        onApplyFilters?.({});
        setIsMoreFiltersOpen(false);
    };

    const toggleDropdown = (filterId) => {
        setOpenDropdown(openDropdown === filterId ? null : filterId);
    };

    return (
        <>
            <div className={cn("filter-section", className)}>
                <div className="filter-wrap flex flex-wrap items-center gap-3 md:gap-4">
                    {/* Desktop visible filters */}
                    {desktopFilters.map((filter) => (
                        <SelectBox
                            key={filter.id}
                            filter={filter}
                            selectedValue={selectedFilters[filter.id]}
                            isOpen={openDropdown === filter.id}
                            onToggle={() => toggleDropdown(filter.id)}
                            onSelect={(value) => handleFilterSelect(filter.id, value)}
                            className="hidden md:block"
                        />
                    ))}

                    {/* More button - only if there are additional filters */}
                    {moreFilters.length > 0 && (
                        <button
                            className={filterButton({ variant: 'more' })}
                            onClick={() => setIsMoreFiltersOpen(true)}
                            aria-label="More Filters"
                            aria-expanded={isMoreFiltersOpen}
                        >
                            <span className="btn-text">More</span>
                        </button>
                    )}

                    {/* Reset Filters button - desktop */}
                    <button
                        className={filterButton({ variant: 'reset', className: 'hidden md:flex' })}
                        onClick={handleResetFilters}
                        aria-label="Reset Filters"
                    >
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                            />
                        </svg>
                        <span className="btn-text">Reset Filters</span>
                    </button>
                </div>
            </div>

            {/* More Filters Modal - Mobile & Additional Filters */}
            {isMoreFiltersOpen && (
                <div className={filterModal()}>
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                        onClick={() => setIsMoreFiltersOpen(false)} 
                    />
                    
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-head">
                            <button
                                className={filterButton({ variant: 'cancel' })}
                                onClick={() => setIsMoreFiltersOpen(false)}
                                aria-label="Cancel"
                            >
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                </svg>
                                <span className="btn-text">Cancel</span>
                            </button>
                        </div>

                        {/* Body - All Filters for Mobile, More Filters for Desktop */}
                        <div className="modal-body">
                            {/* Mobile: Show all filters */}
                            <div className="md:hidden space-y-4">
                                {filters.map((filter) => (
                                    <SelectBox
                                        key={filter.id}
                                        filter={filter}
                                        selectedValue={selectedFilters[filter.id]}
                                        isOpen={openDropdown === filter.id}
                                        onToggle={() => toggleDropdown(filter.id)}
                                        onSelect={(value) => handleFilterSelect(filter.id, value)}
                                    />
                                ))}
                            </div>

                            {/* Desktop: Show only additional filters */}
                            <div className="hidden md:block space-y-4">
                                {moreFilters.map((filter) => (
                                    <SelectBox
                                        key={filter.id}
                                        filter={filter}
                                        selectedValue={selectedFilters[filter.id]}
                                        isOpen={openDropdown === filter.id}
                                        onToggle={() => toggleDropdown(filter.id)}
                                        onSelect={(value) => handleFilterSelect(filter.id, value)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button
                                className={filterButton({ variant: 'apply' })}
                                onClick={handleApplyFilters}
                                aria-label="Apply Filters"
                            >
                                <span className="btn-text">Apply Filters</span>
                            </button>
                            <button
                                className={filterButton({ variant: 'reset' })}
                                onClick={handleResetFilters}
                                aria-label="Reset Filters"
                            >
                                <span className="btn-text">Reset Filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// SelectBox Component
function SelectBox({ filter, selectedValue, isOpen, onToggle, onSelect, className }) {
    const displayValue = selectedValue || filter.defaultValue || 'All';

    return (
        <div className={cn("waf-select-box relative", className)}>
            <button
                className="selected-title group"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <p className="sub-title text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {filter.label}
                </p>
                <div className="flex items-center justify-between gap-2">
                    <p className="title text-sm font-semibold text-gray-900 dark:text-white">
                        {displayValue}
                    </p>
                    <svg
                        className={cn(
                            "w-4 h-4 transition-transform text-gray-600 dark:text-gray-300",
                            isOpen && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="select-box-wrap">
                    <button
                        className="dropdown-close"
                        onClick={onToggle}
                        aria-label="Close dropdown"
                    >
                        Close
                    </button>

                    {filter.type === 'link' ? (
                        <ul className="select-list">
                            {filter.options.map((option) => (
                                <li key={option.value} className="list-item">
                                    <a
                                        href={option.href}
                                        onClick={(e) => {
                                            if (!option.href) {
                                                e.preventDefault();
                                                onSelect(option.label);
                                                onToggle();
                                            }
                                        }}
                                    >
                                        {option.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="select-list">
                            {filter.options.map((option) => (
                                <button
                                    key={option.value}
                                    className="list-item"
                                    onClick={() => {
                                        onSelect(option.label);
                                        onToggle();
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

