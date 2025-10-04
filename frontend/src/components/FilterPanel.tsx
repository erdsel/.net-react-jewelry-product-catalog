import { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
  }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minPopularity, setMinPopularity] = useState<string>('');
  const [maxPopularity, setMaxPopularity] = useState<string>('');

  const handleApplyFilters = () => {
    const filters = {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minPopularity: minPopularity ? parseFloat(minPopularity) : undefined,
      maxPopularity: maxPopularity ? parseFloat(maxPopularity) : undefined,
    };
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinPopularity('');
    setMaxPopularity('');
    onFilterChange({});
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-white shadow-xl rounded-xl p-5 mb-8 max-w-6xl mx-auto border border-amber-200/50">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Title Section */}
        <div className="flex items-center gap-2 lg:border-r lg:border-amber-200 lg:pr-6">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 className="text-lg font-avenir font-bold text-gray-800 whitespace-nowrap">Filters</h2>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-montserrat font-medium text-gray-600 whitespace-nowrap">Price:</span>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-600 text-xs font-semibold">$</span>
            <input
              id="minPrice"
              type="number"
              placeholder="Min"
              min="0"
              step="0.01"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-24 pl-5 pr-2 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition font-montserrat bg-white"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-600 text-xs font-semibold">$</span>
            <input
              id="maxPrice"
              type="number"
              placeholder="Max"
              min="0"
              step="0.01"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-24 pl-5 pr-2 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition font-montserrat bg-white"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-amber-200"></div>

        {/* Popularity Score Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-montserrat font-medium text-gray-600 whitespace-nowrap">Rating:</span>
          </div>
          <input
            id="minPopularity"
            type="number"
            placeholder="Min"
            min="0"
            max="1"
            step="0.1"
            value={minPopularity}
            onChange={(e) => setMinPopularity(e.target.value)}
            className="w-20 px-2 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition font-montserrat bg-white"
          />
          <span className="text-gray-400">-</span>
          <input
            id="maxPopularity"
            type="number"
            placeholder="Max"
            min="0"
            max="1"
            step="0.1"
            value={maxPopularity}
            onChange={(e) => setMaxPopularity(e.target.value)}
            className="w-20 px-2 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition font-montserrat bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-white font-montserrat font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
          >
            Apply
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-white hover:bg-gray-50 text-gray-700 font-montserrat font-medium py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg border border-gray-300 text-sm whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
