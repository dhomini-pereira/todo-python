from peewee import IntegrityError
from flask import jsonify
from src.models.work_area import WorkArea, TypeWorkArea

def create_workarea(userId, data):
    try:
        if not data.get('name') and not data.get('type'):
            return jsonify({ 'error': 'Invalid data' }), 400

        workarea = WorkArea(
            name=data.get('name'),
            type_work_area=TypeWorkArea[data.get('type')].value,
            owner_id=userId
        )
        workarea.save()

        return jsonify({
            'id': workarea.id,
            'name': workarea.name,
            'type': workarea.type_work_area,
            'createdAt': workarea.created_at.isoformat(),
            'updatedAt': workarea.updated_at.isoformat()
        }), 201

    except IntegrityError:
        return jsonify({ 'error': 'Error creating workarea' }), 500
    except Exception as e:
        return jsonify({ 'error': f'Unexpected error occurred: {str(e)}' }), 500
