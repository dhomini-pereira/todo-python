from peewee import DoesNotExist
from flask import jsonify
from src.models.user import User
from src.models.member_work_area import MemberWorkArea
from src.models.work_area import WorkArea, TypeWorkArea

def user_in_workarea(userId, workareaId, username):
    try:
        workarea = WorkArea.get(id=workareaId)

        if workarea.type_work_area == TypeWorkArea.PERSONAL.value:
            return jsonify({'error': 'Workarea is personal'}), 400

        if workarea.owner.id != userId:
            return jsonify({'error': 'User is not owner of workarea'}), 400

        user = User.get(username=username)

        if user.id == workarea.owner.id:
            return jsonify({'error': 'User is owner of workarea'}), 400

        try:
            MemberWorkArea.get(user=user.id, work_area=workarea.id)
            return jsonify({'error': 'User already in workarea'}), 400
        except MemberWorkArea.DoesNotExist:
            memberWorkArea = MemberWorkArea.create(user=user.id, work_area=workarea.id)
            memberWorkArea.save()
            return jsonify({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image_url': user.image_url
            }), 200

    except WorkArea.DoesNotExist:
        return jsonify({'error': 'Workarea not found'}), 404
    except User.DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
