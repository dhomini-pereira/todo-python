from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.work_area import WorkArea, TypeWorkArea

def delete_workarea(workarea_id, userId):
    try:
        workarea = WorkArea.get(id=workarea_id, owner=userId)

        if workarea.type_work_area == TypeWorkArea.PERSONAL.value:
            return jsonify({'message': 'Personal workarea cannot be deleted'}), 400

        workarea.delete_instance()

        return jsonify({'message': 'Workarea deleted successfully'}), 200

    except DoesNotExist:
        return jsonify({'message': 'Workarea not found'}), 404
    except IntegrityError:
        return jsonify({'message': 'Error deleting workarea, integrity constraint violation'}), 500
    except Exception as e:
        return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
