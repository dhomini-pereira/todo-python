from flask import jsonify
import hashlib
from src.models.user import User
from src.utils.create_token import create_token

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
    
    token = create_token({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S')
    })

    return jsonify({
        "token": token
    }), 201
    
    