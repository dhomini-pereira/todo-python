from src.models.user import User
from flask import jsonify
import hashlib

def edit_user(userId, data):
    user = User.get(User.id == userId)
    
    if not user:
        return jsonify({ 'error': 'User not found' }), 404
    
    if not data:
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if not data.get('username') and not data.get('password'):
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if (data.get('username')):
        user.username = data.get('username')
    
    if (data.get('password')):
        user.password = hashlib.sha256(data.get("password").encode('utf-8')).hexdigest()
    
    user.save()
    
    return jsonify({
        'username': user.username,
        'email': user.email,
        'createdAt': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
    }), 200
    
    