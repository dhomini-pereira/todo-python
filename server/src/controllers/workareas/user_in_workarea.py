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

        if workarea.owner.id != userId:
            return jsonify({'message': 'User is not owner of workarea'}), 400

        user = User.get(username=username)

        if user.id == workarea.owner.id:
            return jsonify({'message': 'User is owner of workarea'}), 400

        try:
            MemberWorkArea.get(user=user.id, work_area=workarea.id)
            return jsonify({'message': 'User already in workarea'}), 400
        except MemberWorkArea.DoesNotExist:
            memberWorkArea = MemberWorkArea.create(user=user.id, work_area=workarea.id)
            memberWorkArea.save()
            return jsonify({'message': 'User added to workarea successfully'}), 200

    except WorkArea.DoesNotExist:
        return jsonify({'message': 'Workarea not found'}), 404
    except User.DoesNotExist:
        return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
