from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.work_area import WorkArea

def delete_workarea(workarea_id, userId):
    try:
        workarea = WorkArea.get(id=workarea_id, owner=userId)

        workarea.delete_instance()

        return jsonify({'message': 'Workarea deleted successfully'}), 200

    except DoesNotExist:
        return jsonify({'error': 'Workarea not found'}), 404
    except IntegrityError:
        return jsonify({'error': 'Error deleting workarea, integrity constraint violation'}), 500
    except Exception as e:
        return jsonify({'error': f'Unexpected error occurred: {str(e)}'}), 500
