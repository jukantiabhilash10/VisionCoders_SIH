from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps

auth_blueprint = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(*args, **kwargs)
    return decorated

@auth_blueprint.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        existing_user = mongo.db.users.find_one({'username': data['username']})
        
        if existing_user:
            return jsonify({'message': 'Username already exists'}), 400
        
        hashed_password = generate_password_hash(data['password'])
        new_user = {
            'username': data['username'],
            'password': hashed_password,
            'role': data.get('role', 'user'),
            'created_at': datetime.utcnow()
        }
        
        mongo.db.users.insert_one(new_user)
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_blueprint.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = mongo.db.users.find_one({'username': data['username']})
        
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        token = jwt.encode({
            'user_id': str(user['_id']),
            'username': user['username'],
            'role': user['role'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        
        return jsonify({'token': token})
    except Exception as e:
        return jsonify({'error': str(e)}), 500