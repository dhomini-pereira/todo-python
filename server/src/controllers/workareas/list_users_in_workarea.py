from src.models.member_work_area import MemberWorkArea
from peewee import JOIN
from src.models.work_area import WorkArea
from src.models.user import User
from flask import jsonify

def list_users_in_workarea(user_id, workarea_id):
    try:
        users = (
            User
            .select()
            .join(MemberWorkArea, JOIN.INNER, on=(MemberWorkArea.user == User.id))
            .join(WorkArea, JOIN.INNER, on=(MemberWorkArea.work_area == WorkArea.id))
            .where(
                WorkArea.id == workarea_id,
                User.id == user_id,
                (WorkArea.owner == User.id) | (MemberWorkArea.user == User.id)
            )
        )

        userExists = users.exists()

        if not userExists:
            return jsonify({'error': 'User not found in workarea'}), 404
        
        return jsonify({'users': [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image_url': user.image_url,
            } for user in users
        ]}), 200
    
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
