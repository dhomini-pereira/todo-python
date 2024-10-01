from peewee import DoesNotExist, IntegrityError
from flask import jsonify
import hashlib
from src.utils.create_token import create_token
from src.models.user import User

def login_user(data):
    try:
        if not data.get('email') or not data.get('password'):
            return jsonify({
                "error": "Algum campo do usuário não foi preenchido!"
            }), 400

        data["password"] = hashlib.sha256(data.get("password").encode('utf-8')).hexdigest()
        
        user = User.get(User.email == data.get("email"), User.password == data.get("password"))

        token = create_token({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'image_url': user.image_url,
            'createdAt': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })

        return jsonify({
            'token': token
        }), 200

    except DoesNotExist:
        return jsonify({"error": "Usuário ou senha inválidos!"}), 403
    except IntegrityError:
        return jsonify({"error": "Erro de integridade no banco de dados"}), 500
    except Exception as e:
        return jsonify({"error": f"Ocorreu um erro inesperado: {str(e)}"}), 500
