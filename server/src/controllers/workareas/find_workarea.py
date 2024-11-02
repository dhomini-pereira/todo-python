from peewee import DoesNotExist, JOIN
from flask import jsonify
from src.models.member_work_area import MemberWorkArea
from src.models.work_area import WorkArea

def find_workarea(workarea_id, userId):
    try:
        existsWorkarea = (
            WorkArea
            .select()
            .join(MemberWorkArea, JOIN.LEFT_OUTER, on=(MemberWorkArea.work_area == WorkArea.id))
            .where(
                WorkArea.id == workarea_id,
                (WorkArea.owner == userId) | (MemberWorkArea.user == userId)
            )
        ).exists()
        
        if not existsWorkarea:
            return jsonify({'error': 'Workarea not found'}), 404
        
        workarea = WorkArea.get(id=workarea_id)
        
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
        return jsonify({'error': f'Unexpected error occurred: {str(e)}'}), 500