import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter, currentFilter }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'mitigating', label: 'Mitigating' },
    { value: 'resolved', label: 'Resolved' },
  ];

  return (
    <div className="flex items-center gap-4">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search incidents..."
          className="bg-gray-700 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      <div className="relative">
        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>

        {showFilterMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 shadow-lg z-10">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilter(option.value);
                  setShowFilterMenu(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                  currentFilter === option.value ? 'bg-blue-600' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;