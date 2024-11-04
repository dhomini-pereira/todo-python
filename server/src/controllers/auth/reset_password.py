import jwt
import os
from flask import jsonify

SECRET = os.getenv("SECRET_TOKEN_EMAIL")

def reset_password(data):
    try:
        user_data = jwt.decode(data.get('token'), SECRET, algorithms=['HS256'])
        
        return jsonify(user_data.get('data')), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 403
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500