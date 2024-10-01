from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.utils.r2_image import r2_image
from src.models.user import User
import hashlib

def edit_user(userId, data):
    try:
        user = User.get(User.id == userId)
        
        if not data:
            return jsonify({'error': 'Invalid data'}), 400
        
        if not data.get('username') and not data.get('password') and not data.get('image_url'):
            return jsonify({'error': 'No fields to update'}), 400
        
        if data.get('username'):
            user.username = data.get('username')
        
        if data.get('password'):
            user.password = hashlib.sha256(data.get('password').encode('utf-8')).hexdigest()
        
        if data.get('image_url'):
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

    except DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except IntegrityError:
        return jsonify({'error': 'Database integrity error occurred'}), 500
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
