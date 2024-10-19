from peewee import DoesNotExist
from flask import jsonify
from src.models.work_area import WorkArea

def find_workarea(workarea_id, userId):
    try:
        workarea = WorkArea.get(id=workarea_id)
        
        if workarea.owner.id != userId:
            return jsonify({'error': 'You are not the owner of this workarea'}), 403
        
        return jsonify({
            'id': workarea.id,
            'name': workarea.name,
            'type': workarea.type_work_area,
            'createdAt': workarea.created_at.isoformat(),
            'updatedAt': workarea.updated_at.isoformat()
        }), 200
    
    except DoesNotExist:
        return jsonify({'error': 'Workarea not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500