from flask import jsonify
from src.models.user import User

def list_users_in_workarea(user_id, workarea_id):
    try:
        query = """
            SELECT DISTINCT
	            u.*
            FROM
	            users u,
                member_work_areas mwa,
                work_area wa
            WHERE
	            wa.id = %s
            AND
	            mwa.work_area_id = wa.id
            AND
	            (mwa.user_id = u.id OR wa.owner_id = u.id)
        """
        users = User.raw(query, workarea_id)

        user_list = [user for user in users]

        if not user_list:
            return jsonify({'error': 'User not found in workarea'}), 404
        
        return jsonify({'users': [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image_url': user.image_url,
            } for user in user_list
        ]}), 200
    
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
