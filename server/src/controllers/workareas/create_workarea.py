from src.models.work_area import WorkArea, TypeWorkArea
from flask import jsonify

def create_workarea(userId, data):
    if not data.get('name'):
        return jsonify({ 'error': 'Invalid data' }), 400

    workarea = WorkArea(
        name=data.get('name'),
        type_work_area=TypeWorkArea.PROFESSIONAL,
        owner_id=userId
    )
    workarea.save()

    return jsonify({
        'id': workarea.id,
        'name': workarea.name,
        'type': workarea.type_work_area,
        'createdAt': workarea.created_at
    }), 201