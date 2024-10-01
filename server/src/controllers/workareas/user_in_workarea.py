from peewee import DoesNotExist
from flask import jsonify
from src.models.user import User
from src.models.member_work_area import MemberWorkArea
from src.models.work_area import WorkArea, TypeWorkArea

def user_in_workarea(userId, workareaId, username):
    try:
        workarea = WorkArea.get(id=workareaId)

        if workarea.type_work_area == TypeWorkArea.PERSONAL.value:
            return jsonify({'message': 'Workarea is personal'}), 400
        
        if workarea.owner != userId:
            return jsonify({'message': 'User is not owner of workarea'}), 400

        user = User.get(username=username)

        memberWorkArea = MemberWorkArea.get(user=user.id, work_area=workarea.id)
        
        return jsonify({'message': 'User already in workarea'}), 400

    except DoesNotExist as e:
        if isinstance(e, User):
            return jsonify({'message': 'User not found'}), 404
        elif isinstance(e, WorkArea):
            return jsonify({'message': 'Workarea not found'}), 404
        elif isinstance(e, MemberWorkArea):
            memberWorkArea = MemberWorkArea.create(user=user.id, work_area=workareaId)
            memberWorkArea.save()
            return jsonify({'message': 'User added to workarea successfully'}), 200

    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
