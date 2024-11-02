from peewee import DoesNotExist, IntegrityError
from src.models.user import User

def remove_user(userId):
    try:
        user = User.get(User.id == userId)
        user.delete_instance()
        return 200
    except DoesNotExist:
        return {'error': 'User not found'}, 404
    except IntegrityError:
        return {'error': 'Error deleting user'}, 500
    except Exception as e:
        return {'error': f'Error deleting user: {str(e)}'}, 500
