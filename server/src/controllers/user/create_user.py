from flask import jsonify
import hashlib
from src.models.user import User

def create_user(data):
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({
            "error": "Algum campo do usuário não foi preenchido!"
        }), 400
    
    data["password"] = hashlib.sha256(data.get("password").encode('utf-8')).hexdigest()
    
    user = User(
        username = data.get("username"),
        email = data.get("email"),
        password = data.get("password")
    )
    user.save()

    return jsonify({
        'username': user.username,
        'email': user.email,
        'createdAt': user.created_at
    }), 201
    
    