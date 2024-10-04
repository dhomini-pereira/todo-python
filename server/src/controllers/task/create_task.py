from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.member_work_area import MemberWorkArea
from src.models.task import Task
from src.models.work_area import WorkArea
from peewee import JOIN
from datetime import datetime

def create_task(userId, data, workarea_id):
    if not data.get('title') or not data.get('description'):
        return jsonify({'error': 'Invalid data'}), 400

    try:
        workarea = (
            WorkArea
            .select()
            .join(MemberWorkArea, JOIN.LEFT_OUTER)
            .where(
                (
                    (MemberWorkArea.user == userId) |
                    (WorkArea.owner == userId)
                ) &
                (WorkArea.id == workarea_id)
            )
        )

        if not workarea.exists():
            return jsonify({'error': 'Work area not found'}), 404

        task = Task(
            title=data.get('title'),
            description=data.get('description'),
            work_area=workarea_id,
            time_estimate=datetime.fromisoformat(data.get('timeEstimate')) if data.get('timeEstimate') else None,
            user=data.get('userId') if data.get('userId') else None
        )
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
        }), 201

    except DoesNotExist:
        return jsonify({'error': 'Work area or user not found'}), 404
    except IntegrityError:
        return jsonify({'error': 'Failed to create task due to database error'}), 500
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
