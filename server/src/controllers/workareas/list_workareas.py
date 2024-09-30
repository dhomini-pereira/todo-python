from src.models.work_area import WorkArea
from flask import jsonify
from src.models.member_work_area import MemberWorkArea
from peewee import JOIN

def list_workareas(userId):
    workareas = (
        WorkArea
        .select()
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
                'createdAt': workarea.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'updatedAt': workarea.updated_at.strftime('%Y-%m-%d %H:%M:%S')
            } for workarea in workareas
        ]
    })
