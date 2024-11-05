import jwt
import os
import hashlib
from flask import jsonify
from src.models.user import User

SECRET = os.getenv("SECRET_TOKEN_EMAIL")

def reset_password(data):
    try:
        user_data = jwt.decode(data.get('token'), SECRET, algorithms=['HS256'])

        if not data.get('password'):
            return jsonify({'error': 'Password is required'}), 400

        user = User.select().where(User.id == user_data.get('data').get('id')).first()
        user.password = hashlib.sha256(data.get('password').encode('utf-8')).hexdigest()
        user.save()
        
        return jsonify(), 204
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 403
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500