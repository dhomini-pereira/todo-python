from peewee import DoesNotExist
from flask import jsonify
from src.models.user import User
from src.models.work_area import WorkArea, TypeWorkArea
from src.models.member_work_area import MemberWorkArea

def remove_user_workarea(userId, workareaId, username):
    try:
        workarea = WorkArea.get(id=workareaId)

        if workarea.owner.id != userId:
            return jsonify({'message': 'You are not the owner of this workarea'}), 403
        
        if workarea.type_work_area == TypeWorkArea.PERSONAL.value:
            return jsonify({'message': 'You cannot remove a personal workarea'}), 403

        user = User.get(username=username)

        memberWorkarea = MemberWorkArea.get(user=user.id, work_area=workarea.id)

        if not memberWorkarea:
            return jsonify({'message': 'User not found in workarea'}), 404

        memberWorkarea.delete_instance()

        return jsonify({'message': 'User removed from workarea successfully'}), 200

    except DoesNotExist:
        return jsonify({'message': 'Workarea or user not found'}), 404
    
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
