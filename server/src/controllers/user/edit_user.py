from src.models.user import User
from flask import jsonify
from src.utils.r2_image import r2_image
import hashlib

def edit_user(userId, data):
    user = User.get(User.id == userId)
    
    if not user:
        return jsonify({ 'error': 'User not found' }), 404
    
    if not data:
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if not data.get('username') and not data.get('password') and not data.get('image_url'):
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if (data.get('username')):
        user.username = data.get('username')
    
    if (data.get('password')):
        user.password = hashlib.sha256(data.get("password").encode('utf-8')).hexdigest()

    if (data.get('image_url')):
        url = r2_image(data.get('image_url'), user.id)
        user.image_url = url
    
    user.save()
    
    return jsonify({
        'username': user.username,
        'email': user.email,
        'image_url': user.image_url,
        'createdAt': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updatedAt': user.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    }), 200
    
    