from flask import Blueprint, request, jsonify
from models.incident_model import Incident
from bson import ObjectId

incident_blueprint = Blueprint('incidents', __name__)

@incident_blueprint.route('/', methods=['GET'])
def get_incidents():
    try:
        incidents = list(mongo.db.incidents.find())
        return jsonify([{
            'id': str(incident['_id']),
            'type': incident['type'],
            'description': incident['description'],
            'severity': incident['severity'],
            'status': incident['status'],
            'timestamp': incident['timestamp']
        } for incident in incidents])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@incident_blueprint.route('/', methods=['POST'])
def create_incident():
    try:
        data = request.get_json()
        new_incident = {
            'type': data['type'],
            'description': data['description'],
            'severity': data['severity'],
            'status': 'open',
            'timestamp': datetime.utcnow()
        }
        result = mongo.db.incidents.insert_one(new_incident)
        return jsonify({'id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@incident_blueprint.route('/<incident_id>', methods=['PUT'])
def update_incident(incident_id):
    try:
        data = request.get_json()
        mongo.db.incidents.update_one(
            {'_id': ObjectId(incident_id)},
            {'$set': data}
        )
        return jsonify({'message': 'Incident updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500