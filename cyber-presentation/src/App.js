import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import SearchFilter from "./components/SearchFilter";
import IncidentCard from "./components/IncidentCard";

function App() {
  const [activeTab, setActiveTab] = useState('Incidents');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [incidents, setIncidents] = useState([
    {
      id: '1',
      title: 'Suspicious Login Attempt',
      category: 'unauthorized-access',
      severity: 'high',
      status: 'investigating',
      timeAgo: '15m',
      aiConfidence: '94%'
    },
    {
      id: '2',
      title: 'Phishing Email Campaign Detected',
      category: 'phishing',
      severity: 'critical',
      status: 'mitigating',
      timeAgo: '45m',
      aiConfidence: '98%'
    },
    {
      id: '3',
      title: 'Malware Signature Found',
      category: 'malware',
      severity: 'high',
      status: 'resolved',
      timeAgo: '2h',
      aiConfidence: '87%'
    },
    {
      id: '4',
      title: 'Data Exfiltration Attempt',
      category: 'espionage',
      severity: 'critical',
      status: 'investigating',
      timeAgo: '30m',
      aiConfidence: '91%'
    }
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter incidents based on search query
    // This would typically be handled by the backend
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    // Filter incidents based on status
    // This would typically be handled by the backend
  };

  const handleStatusChange = async (incidentId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/incidents/${incidentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      // Update local state
      setIncidents(incidents.map(inc => 
        inc.id === incidentId ? { ...inc, status: newStatus } : inc
      ));
    } catch (error) {
      console.error('Error updating incident status:', error);
      setError('Failed to update incident status');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Implement different views based on tab
    // This would typically load different data from the backend
  };

  // Filter incidents based on search query and status
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = searchQuery === '' || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || incident.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <main className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Incidents</h1>
          <SearchFilter 
            onSearch={handleSearch}
            onFilter={handleFilter}
            currentFilter={filterStatus}
          />
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <span className="text-gray-400">Loading incidents...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <IncidentCard 
                key={incident.id} 
                incident={incident}
                onStatusChange={(newStatus) => handleStatusChange(incident.id, newStatus)}
              />
            ))}
            {filteredIncidents.length === 0 && (
              <div className="text-center py-8">
                <span className="text-gray-400">No incidents found</span>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
