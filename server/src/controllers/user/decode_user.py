from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.user import User

def decode_user(userId: str):
    try:
        user = User.get(User.id == userId)
        return jsonify({
            'username': user.username,
            'email': user.email,
            'image_url': user.image_url,
            'createdAt': user.created_at.isoformat(),
            'updatedAt': user.updated_at.isoformat()
        }), 200
    except DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except IntegrityError:
        return jsonify({'error': 'Database integrity error occurred'}), 500
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500