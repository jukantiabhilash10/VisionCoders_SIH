import React, { useState, useEffect } from 'react';

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newIncident, setNewIncident] = useState({
    type: '',
    description: '',
    severity: 'HIGH'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncidents();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load incident categories');
    }
  };

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/incidents');
      const data = await response.json();
      setIncidents(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setError('Failed to load incidents');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncident),
      });
      const data = await response.json();
      setIncidents([...incidents, data]);
      setNewIncident({ type: '', description: '', severity: 'low' });
    } catch (error) {
      console.error('Error creating incident:', error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/incidents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedIncident = await response.json();
      setIncidents(incidents.map(inc => 
        inc._id === updatedIncident._id ? updatedIncident : inc
      ));
    } catch (error) {
      console.error('Error updating incident:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">AI-Enabled Defense Cyber Incident Management</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create New Incident Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Report New Defense Incident</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Incident Type</label>
            <select
              value={newIncident.type}
              onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Incident Type</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Detailed Description</label>
            <textarea
              value={newIncident.description}
              onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Provide detailed information about the incident..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Threat Level</label>
            <select
              value={newIncident.severity}
              onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
              transition duration-200`}
          >
            {loading ? 'Processing...' : 'Submit Incident Report'}
          </button>
        </form>
      </div>

      {/* Incidents Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Defense Incidents Dashboard</h3>
        <div className="space-y-6">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="border border-gray-200 p-6 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-lg">{incident.type.replace('_', ' ')}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${incident.threat_analysis?.risk === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                      incident.threat_analysis?.risk === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      incident.threat_analysis?.risk === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                      {incident.threat_analysis?.risk || incident.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{incident.description}</p>
                  
                  {/* AI Analysis Section */}
                  {incident.threat_analysis && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-2">AI Threat Analysis</h5>
                      <p className="text-sm text-gray-600">
                        Confidence: {(incident.threat_analysis.confidence * 100).toFixed(1)}%
                      </p>
                      {incident.automated_response && (
                        <div className="mt-2">
                          <h6 className="font-medium text-gray-700">Recommended Actions:</h6>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            {incident.automated_response.map((action, index) => (
                              <li key={index}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Reported: {new Date(incident.timestamp).toLocaleString()}
                    </span>
                    <select
                      value={incident.status}
                      onChange={(e) => handleUpdateStatus(incident.id, e.target.value)}
                      className="border rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="investigating">Investigating</option>
                      <option value="mitigating">Mitigating</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {incidents.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No incidents reported yet
            </div>
          )}
          {loading && (
            <div className="text-center py-8 text-gray-500">
              Loading incidents...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentManagement;