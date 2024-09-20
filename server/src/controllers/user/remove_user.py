from src.models.user import User

def remove_user(userId):
    user = User.get(User.id == userId)
    user.delete_instance
    
    return 200
    