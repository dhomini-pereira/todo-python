from peewee import IntegrityError
from flask import jsonify
from src.models.user import User
from src.models.work_area import WorkArea, TypeWorkArea
import hashlib

def create_user(data):
    try:
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({
                "error": "Algum campo do usuário não foi preenchido!"
            }), 400
        
        data["password"] = hashlib.sha256(data.get("password").encode('utf-8')).hexdigest()

        user = User(
            username=data.get("username"),
            email=data.get("email"),
            password=data.get("password")
        )
        user.save()

        workarea = WorkArea(
            name=f'personal-{user.id}',
            type_work_area=TypeWorkArea.PERSONAL.value,
            owner=user.id
        )
        workarea.save()

        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'image_url': user.image_url,
            'createdAt': user.created_at.isoformat(),
            'updatedAt': user.updated_at.isoformat()
        }), 201

    except IntegrityError:
        return jsonify({"error": "User already exists!"}), 400
    except Exception as e:
        return jsonify({"error": f"Error creating user: {str(e)}"}), 500
