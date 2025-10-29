import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['Dashboard', 'Incidents', 'Report', 'Analytics'];

  return (
    <nav className="flex space-x-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg ${
            activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-blue-50'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;