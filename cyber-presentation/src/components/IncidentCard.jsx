import React from 'react';

const IncidentCard = ({ incident, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'mitigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-700 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white text-lg font-semibold">{incident.title}</h3>
            <span className={`px-2 py-1 rounded-md text-sm ${getSeverityColor(incident.severity)}`}>
              {incident.severity}
            </span>
          </div>
          <div className="mt-2 text-gray-400">
            <span>ID: #{incident.id}</span>
            <span className="mx-2">•</span>
            <span>Category: {incident.category}</span>
            <span className="mx-2">•</span>
            <span>{incident.timeAgo} ago</span>
          </div>
          <div className="mt-2 text-blue-400">
            AI Confidence: {incident.aiConfidence}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={incident.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`px-3 py-1 rounded-lg text-sm border-0 cursor-pointer ${getStatusColor(incident.status)}`}
          >
            <option value="investigating">Investigating</option>
            <option value="mitigating">Mitigating</option>
            <option value="resolved">Resolved</option>
          </select>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => {/* Add view details handler */}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;