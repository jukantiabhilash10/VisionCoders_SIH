from flask import Flask, jsonify, request, make_response
from datetime import datetime
import os
from flask_cors import CORS
import random  # Temporary for AI simulation

app = Flask(__name__)
CORS(app)

# In-memory storage for development
incidents = []
users = []

# Predefined categories for defense sector
INCIDENT_CATEGORIES = [
    'unauthorized-access',
    'phishing',
    'malware',
    'espionage',
    'network-intrusion',
    'data-breach',
    'insider-threat',
    'social-engineering'
]

# Simulated AI threat assessment
def ai_threat_assessment(incident_data):
    # This would be replaced with actual AI/ML model
    threat_levels = {
        'SPEAR_PHISHING': {'risk': 'HIGH', 'confidence': 0.85},
        'DEEPFAKE_ATTACK': {'risk': 'CRITICAL', 'confidence': 0.92},
        'SOCIAL_ENGINEERING': {'risk': 'MEDIUM', 'confidence': 0.78},
        'MALWARE_INFECTION': {'risk': 'HIGH', 'confidence': 0.88},
        'DATA_BREACH': {'risk': 'CRITICAL', 'confidence': 0.95},
        'ESPIONAGE_ATTEMPT': {'risk': 'CRITICAL', 'confidence': 0.90},
        'NETWORK_INTRUSION': {'risk': 'HIGH', 'confidence': 0.87},
        'INSIDER_THREAT': {'risk': 'HIGH', 'confidence': 0.82}
    }
    return threat_levels.get(incident_data['type'], {'risk': 'UNKNOWN', 'confidence': 0.5})

# Simulated automated response recommendations
def get_automated_response(incident_type):
    responses = {
        'SPEAR_PHISHING': [
            'Isolate affected systems',
            'Block sender domain',
            'Initiate email trace',
            'Update phishing filters'
        ],
        'DEEPFAKE_ATTACK': [
            'Authenticate communication channels',
            'Deploy deepfake detection tools',
            'Issue command verification protocols',
            'Alert senior command'
        ],
        'SOCIAL_ENGINEERING': [
            'Enhance access controls',
            'Conduct immediate staff briefing',
            'Review security protocols',
            'Monitor suspicious activities'
        ]
    }
    return responses.get(incident_type, ['Escalate to cyber response team'])

# Root route
@app.route('/')
def root():
    return jsonify({
        "message": "Welcome to AI-Enabled Cyber Incident & Safety API",
        "version": "1.0",
        "available_endpoints": {
            "GET /": "This help message",
            "GET /api/health": "Health check endpoint",
            "GET /api/incidents": "List all incidents",
            "POST /api/incidents": "Create a new incident",
            "PUT /api/incidents/<id>": "Update an incident by ID"
        }
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({
        'error': 'Not found',
        'message': 'The requested URL was not found on the server.',
        'available_endpoints': {
            'GET /': 'API documentation',
            'GET /api/health': 'Health check',
            'GET /api/incidents': 'List incidents',
            'POST /api/incidents': 'Create incident',
            'PUT /api/incidents/<id>': 'Update incident'
        }
    }), 404)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({
        'error': 'Bad request',
        'message': 'The server could not understand the request.'
    }), 400)

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "message": "Backend service is running"})

@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify(INCIDENT_CATEGORIES)

@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    return jsonify(incidents)

@app.route('/api/incidents', methods=['POST'])
def create_incident():
    try:
        data = request.get_json()
        # AI threat assessment
        threat_analysis = ai_threat_assessment(data)
        automated_response = get_automated_response(data['type'])
        
        incident = {
            'id': len(incidents) + 1,
            'type': data['type'],
            'description': data['description'],
            'severity': data['severity'],
            'status': 'open',
            'timestamp': datetime.utcnow().isoformat(),
            'created_at': datetime.utcnow().isoformat(),
            'threat_analysis': threat_analysis,
            'automated_response': automated_response,
            'mitigation_status': 'PENDING'
        }
        incidents.append(incident)
        return jsonify(incident), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/incidents/<int:incident_id>', methods=['PUT'])
def update_incident(incident_id):
    try:
        data = request.get_json()
        for incident in incidents:
            if incident['id'] == incident_id:
                incident.update(data)
                incident['updated_at'] = datetime.utcnow().isoformat()
                return jsonify(incident)
        return jsonify({'error': 'Incident not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    # app.run(debug=True, host='0.0.0.0', port=port)