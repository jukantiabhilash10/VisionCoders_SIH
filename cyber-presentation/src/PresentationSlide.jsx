import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, TrendingUp, Bell, Search, Filter, ChevronRight, Lock, Zap, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const CyberIncidentPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [incidents, setIncidents] = useState([]);
  const [threats, setThreats] = useState([]);
  const [newIncident, setNewIncident] = useState({ title: '', description: '', category: 'phishing' });
  const [stats, setStats] = useState({
    totalIncidents: 0,
    activeThreats: 0,
    resolvedToday: 0,
    responseTime: '2.3m'
  });

  useEffect(() => {
    // Initialize with sample data
    const sampleIncidents = [
      {
        id: 1,
        title: 'Suspicious Login Attempt',
        category: 'unauthorized-access',
        severity: 'high',
        status: 'investigating',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        aiConfidence: 94
      },
      {
        id: 2,
        title: 'Phishing Email Campaign Detected',
        category: 'phishing',
        severity: 'critical',
        status: 'mitigating',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        aiConfidence: 98
      },
      {
        id: 3,
        title: 'Malware Signature Found',
        category: 'malware',
        severity: 'high',
        status: 'resolved',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        aiConfidence: 87
      },
      {
        id: 4,
        title: 'Data Exfiltration Attempt',
        category: 'espionage',
        severity: 'critical',
        status: 'investigating',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        aiConfidence: 91
      }
    ];

    const sampleThreats = [
      { id: 1, type: 'Spear Phishing', count: 12, trend: 'up' },
      { id: 2, type: 'Malware', count: 8, trend: 'down' },
      { id: 3, type: 'DDoS Attack', count: 5, trend: 'up' },
      { id: 4, type: 'Data Breach', count: 3, trend: 'stable' }
    ];

    setIncidents(sampleIncidents);
    setThreats(sampleThreats);
    setStats({
      totalIncidents: sampleIncidents.length,
      activeThreats: sampleIncidents.filter(i => i.status !== 'resolved').length,
      resolvedToday: sampleIncidents.filter(i => i.status === 'resolved').length,
      responseTime: '2.3m'
    });
  }, []);

  const handleSubmitIncident = (e) => {
    e.preventDefault();
    const incident = {
      id: incidents.length + 1,
      title: newIncident.title,
      category: newIncident.category,
      severity: 'medium',
      status: 'new',
      timestamp: new Date(),
      aiConfidence: Math.floor(Math.random() * 20) + 80
    };
    setIncidents([incident, ...incidents]);
    setStats(prev => ({
      ...prev,
      totalIncidents: prev.totalIncidents + 1,
      activeThreats: prev.activeThreats + 1
    }));
    setNewIncident({ title: '', description: '', category: 'phishing' });
    setActiveTab('incidents');
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return colors[severity] || 'bg-gray-500';
  };

  const getStatusIcon = (status) => {
    const icons = {
      new: <Clock className="w-4 h-4" />,
      investigating: <Eye className="w-4 h-4" />,
      mitigating: <Zap className="w-4 h-4" />,
      resolved: <CheckCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const formatTimestamp = (date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Tailwind test banner - should be red if Tailwind is active */}
      {/* <div className="w-full text-center py-3 bg-red-500 text-white font-bold">TAILWIND CSS TEST BANNER</div> */}
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-lg border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold">AI-Enabled Cyber Incident Portal</h1>
                <p className="text-sm text-gray-400">Defence Cybersecurity Command</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">AI Active</span>
              </div>
              <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2">
          {['dashboard', 'incidents', 'report', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Incidents</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalIncidents}</p>
                  </div>
                  <Activity className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-red-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Threats</p>
                    <p className="text-3xl font-bold mt-2 text-red-400">{stats.activeThreats}</p>
                  </div>
                  <AlertTriangle className="w-10 h-10 text-red-400" />
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Resolved Today</p>
                    <p className="text-3xl font-bold mt-2 text-green-400">{stats.resolvedToday}</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Response Time</p>
                    <p className="text-3xl font-bold mt-2 text-purple-400">{stats.responseTime}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Live Threat Detection */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Live Threat Detection
              </h2>
              <div className="space-y-3">
                {threats.map(threat => (
                  <div key={threat.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium">{threat.type}</p>
                        <p className="text-sm text-gray-400">{threat.count} detected instances</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {threat.trend === 'up' && <TrendingUp className="w-5 h-5 text-red-400" />}
                      {threat.trend === 'down' && <TrendingUp className="w-5 h-5 text-green-400 rotate-180" />}
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        threat.trend === 'up' ? 'bg-red-500/20 text-red-400' :
                        threat.trend === 'down' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {threat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <h2 className="text-xl font-bold mb-4">Recent Incidents</h2>
              <div className="space-y-3">
                {incidents.slice(0, 3).map(incident => (
                  <div key={incident.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-12 ${getSeverityColor(incident.severity)} rounded-full`}></div>
                      <div>
                        <p className="font-medium">{incident.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-400">{formatTimestamp(incident.timestamp)}</span>
                          <span className="text-sm text-blue-400">AI: {incident.aiConfidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(incident.status)}
                      <span className="text-sm text-gray-400">{incident.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">All Incidents</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                  <button className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {incidents.map(incident => (
                  <div key={incident.id} className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className={`w-1 h-full ${getSeverityColor(incident.severity)} rounded-full`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-lg">{incident.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(incident.severity)} bg-opacity-20`}>
                              {incident.severity}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>ID: #{incident.id}</span>
                            <span>Category: {incident.category}</span>
                            <span>{formatTimestamp(incident.timestamp)}</span>
                            <span className="text-blue-400">AI Confidence: {incident.aiConfidence}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-600 rounded-lg">
                          {getStatusIcon(incident.status)}
                          <span className="text-sm">{incident.status}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Report Tab */}
        {activeTab === 'report' && (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-xl font-bold mb-6">Report New Incident</h2>
            <form onSubmit={handleSubmitIncident} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Incident Title</label>
                <input
                  type="text"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description of the incident"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newIncident.category}
                  onChange={(e) => setNewIncident({...newIncident, category: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="phishing">Phishing</option>
                  <option value="malware">Malware</option>
                  <option value="espionage">Espionage</option>
                  <option value="unauthorized-access">Unauthorized Access</option>
                  <option value="ddos">DDoS Attack</option>
                  <option value="data-breach">Data Breach</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none h-32"
                  placeholder="Detailed description of the incident, including any relevant information..."
                  required
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Submit Secure Report
                </button>
                <button
                  type="button"
                  onClick={() => setNewIncident({ title: '', description: '', category: 'phishing' })}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <h2 className="text-xl font-bold mb-6">Predictive Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">Threat Prediction (Next 24h)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Phishing Attempts</span>
                      <span className="text-red-400 font-bold">+32%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: '32%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span>Malware Detection</span>
                      <span className="text-yellow-400 font-bold">+18%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{width: '18%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span>DDoS Risk</span>
                      <span className="text-green-400 font-bold">-12%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '12%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">AI Model Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Detection Accuracy</span>
                        <span className="text-sm font-bold text-green-400">94.7%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '94.7%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">False Positive Rate</span>
                        <span className="text-sm font-bold text-blue-400">3.2%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{width: '3.2%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Response Efficiency</span>
                        <span className="text-sm font-bold text-purple-400">91.3%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{width: '91.3%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
              <h2 className="text-xl font-bold mb-4">Historical Trends</h2>
              <p className="text-gray-400">
                40% reduction in response time achieved through AI automation.
                Enhanced coordination across defence sectors with unified platform.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-800/50 backdrop-blur-lg border-t border-blue-500/20 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>AES-256 Encrypted | TensorFlow AI Models</span>
            </div>
            <div>
              <span>VisionCoders | SIH 2025 - SID: 25183</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberIncidentPortal;