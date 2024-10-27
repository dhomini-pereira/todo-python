from flask import jsonify
from src.models.work_area import WorkArea

def update_workarea(userId, workareaId, data):
    try:
        workarea = WorkArea.get(id=workareaId, owner=userId)

        if data.get('name'):
            workarea.name = data.get('name')

        workarea.save()

        return jsonify({
            'id': workarea.id,
            'name': workarea.name,
            'type': workarea.type_work_area,
            'createdAt': workarea.created_at.isoformat(),
            'updatedAt': workarea.updated_at.isoformat()
        }), 200

    except WorkArea.DoesNotExist:
        return jsonify({'error': 'Workarea not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
