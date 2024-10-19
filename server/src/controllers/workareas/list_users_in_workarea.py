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
            .join(MemberWorkArea, JOIN.LEFT_OUTER, on=(MemberWorkArea.user == User.id))
            .join(WorkArea, JOIN.LEFT_OUTER, on=(WorkArea.id == MemberWorkArea.work_area))
            .where(
                ((WorkArea.owner == user_id) & (WorkArea.id == workarea_id)) |
                ((MemberWorkArea.user == user_id) & (WorkArea.id == workarea_id))
            )
        )

        user_list = [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image_url': user.image_url,
            } for user in users
        ]
        
        return jsonify({'users': user_list}), 200
    
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
