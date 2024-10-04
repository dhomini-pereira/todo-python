from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.member_work_area import MemberWorkArea
from src.models.task import Task
from src.models.work_area import WorkArea
from peewee import JOIN
from datetime import datetime

def edit_task(workarea_id, id, data, userId):
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

        if not data:
            return jsonify({'error': 'Invalid data'}), 400

        if not data.get('title') and not data.get('description') and not data.get('status') and not data.get('user_id') and not data.get('timeEstimate'):
            return jsonify({'error': 'Invalid data'}), 400

        if data.get('title'):
            task.title = data.get('title')

        if data.get('description'):
            task.description = data.get('description')

        if data.get('status'):
            task.status = data.get('status')

        if data.get('user_id'):
            task.user = data.get('user_id')

        if data.get('timeEstimate'):
            task.time_estimate = datetime.fromisoformat(data.get('timeEstimate'))

        task.updated_at = datetime.now()
        task.save()

        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'status': task.status,
            'timeEstimate': task.time_estimate.isoformat() if task.time_estimate else None,
            'userId': task.user.id if task.user else None,
            'createdAt': task.created_at.isoformat(),
            'updatedAt': task.updated_at.isoformat()
        }), 200

    except DoesNotExist:
        return jsonify({'error': 'Task or work area not found'}), 404
    except IntegrityError:
        return jsonify({'error': 'Failed to update task due to database error'}), 500
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
