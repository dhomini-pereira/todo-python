from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.member_work_area import MemberWorkArea
from src.models.task import Task
from src.models.work_area import WorkArea
from peewee import JOIN

def find_task(workarea_id, id, userId):
    try:
        task = (
            Task
            .select()
            .join(WorkArea, on=(Task.work_area == WorkArea.id))
            .join(MemberWorkArea, JOIN.LEFT_OUTER, on=(MemberWorkArea.work_area == WorkArea.id))
            .where(
                WorkArea.id == workarea_id,
                Task.id == id,
                (WorkArea.owner == userId) | (MemberWorkArea.user == userId)
            )
        ).get()

        if not task:
            return jsonify({'error': 'Task not found'}), 404

        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'status': task.status,
            'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': task.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }), 200

    except DoesNotExist:
        return jsonify({'error': 'Task or work area not found'}), 404
    except IntegrityError:
        return jsonify({'error': 'Failed to retrieve task due to database error'}), 500
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
