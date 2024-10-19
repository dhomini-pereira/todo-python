from src.models.member_work_area import MemberWorkArea
from peewee import JOIN
from src.models.work_area import WorkArea
from src.models.user import User
from flask import jsonify

def list_users_in_workarea(userId, workarea_id):
    try:
        users = (
            User
            .select()
            .join(MemberWorkArea)
            .where(MemberWorkArea.work_area == workarea_id)
        )
        
        return jsonify({
            'users': [
                {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'image_url': user.image_url,
                } for user in users
            ]
        }), 200
    
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
