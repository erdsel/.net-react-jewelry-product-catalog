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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Filter Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Range Filter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Price Range ($)</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-600 mb-1">
                Min Price
              </label>
              <input
                id="minPrice"
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-600 mb-1">
                Max Price
              </label>
              <input
                id="maxPrice"
                type="number"
                placeholder="10000"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Popularity Score Filter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Popularity Score</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="minPopularity" className="block text-sm font-medium text-gray-600 mb-1">
                Min Score (0-1)
              </label>
              <input
                id="minPopularity"
                type="number"
                placeholder="0"
                min="0"
                max="1"
                step="0.1"
                value={minPopularity}
                onChange={(e) => setMinPopularity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="maxPopularity" className="block text-sm font-medium text-gray-600 mb-1">
                Max Score (0-1)
              </label>
              <input
                id="maxPopularity"
                type="number"
                placeholder="1"
                min="0"
                max="1"
                step="0.1"
                value={maxPopularity}
                onChange={(e) => setMaxPopularity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleApplyFilters}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 shadow-md hover:shadow-lg"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md transition duration-200 shadow-md hover:shadow-lg"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
