from peewee import IntegrityError
from flask import jsonify
from src.models.work_area import WorkArea, TypeWorkArea

def create_workarea(userId, data):
    try:
        if not data.get('name'):
            return jsonify({ 'error': 'Invalid data' }), 400

        workarea = WorkArea(
            name=data.get('name'),
            type_work_area=TypeWorkArea.PROFESSIONAL.value,
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
        return jsonify({ 'error': 'Erro de integridade no banco de dados' }), 500
    except Exception as e:
        return jsonify({ 'error': f'Ocorreu um erro inesperado: {str(e)}' }), 500
