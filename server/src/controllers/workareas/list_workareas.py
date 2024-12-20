from peewee import DoesNotExist
from flask import jsonify
from src.models.work_area import WorkArea
from src.models.member_work_area import MemberWorkArea
from peewee import JOIN

def list_workareas(userId):
    try:
        workareas = (
            WorkArea
            .select()
            .distinct()
            .join(MemberWorkArea, JOIN.LEFT_OUTER)
            .where(
                (MemberWorkArea.user == userId) |
                (WorkArea.owner == userId)
            )
        )

        return jsonify({
            'workareas': [
                {
                    'id': workarea.id,
                    'name': workarea.name,
                    'type': workarea.type_work_area,
                    'createdAt': workarea.created_at.isoformat(),
                    'updatedAt': workarea.updated_at.isoformat()
                } for workarea in workareas
            ]
        }), 200

    except DoesNotExist:
        return jsonify({'error': 'No workareas found'}), 404
    except Exception as e:
        return jsonify({'error': f'Unexpected error occurred: {str(e)}'}), 500
