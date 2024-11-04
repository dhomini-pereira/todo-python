from flask import jsonify
from src.models.user import User
import datetime
from src.utils.send_email import send_email
import jwt
import os

SECRET = os.getenv("SECRET_TOKEN_EMAIL")

def forgot_password(data):
    if not data.get('email'):
        return jsonify({'error': 'Invalid data'}), 400
    
    user = User.select().where(User.email == data.get('email')).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    payload = {
        'data': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
    }
    token = jwt.encode(payload, SECRET, algorithm='HS256')

    send_email(data.get('email'), token)

    return jsonify(), 204