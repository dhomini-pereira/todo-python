from flask import jsonify
import hashlib
from src.models.user import User
from src.utils.create_token import create_token

def login_user(data):
    if not data.get('email') or not data.get('password'):
        return jsonify({
            "error": "Algum campo do usuário não foi preenchido!"
        }), 400
    
    data["password"] = hashlib.sha256(data.get("password").encode('utf-8')).hexdigest()
    
    user = User.get(email=data.get("email"), password=data.get("password"))
    
    if not user:
        return jsonify({
            "error": "Usuário ou senha inválidos!"
        }), 403
        
    token = create_token({
        'username': user.username,
        'email': user.email,
        'createdAt': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
    })
    
    return jsonify({
        'token': token
    })
    