from flask import jsonify
from src.models.user import User

def list_users_in_workarea(user_id, workarea_id, args):
    try:
        if "member" in args:
            query = """
                SELECT DISTINCT
                    u.*
                FROM
                    users u
                JOIN
                    member_work_areas mwa ON mwa.user_id = u.id
                WHERE
                    mwa.work_area_id = %s
            """
        else:
            query = """
                SELECT DISTINCT
                    u.*
                FROM
                    users u
                JOIN
                    work_area wa
                ON
                    wa.id = %s
               	LEFT JOIN
                    member_work_areas mwa
                ON
                    wa.id = mwa.work_area_id
                WHERE
                    (mwa.user_id = u.id OR wa.owner_id = u.id);
            """

        users = User.raw(query, workarea_id)
        user_list = [user for user in users]

        if not user_list:
            return jsonify({'error': 'User not found in workarea'}), 200
        
        return jsonify({'users': [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image_url': user.image_url,
            } for user in user_list
        ]}), 200
    
    except Exception as e:
        return jsonify({'error': f'Unexpected error occurred: {str(e)}'}), 500
