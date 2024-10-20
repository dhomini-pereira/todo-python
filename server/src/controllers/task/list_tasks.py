from peewee import DoesNotExist, IntegrityError
from flask import jsonify
from src.models.member_work_area import MemberWorkArea
from src.models.task import Task
from src.models.work_area import WorkArea
from peewee import JOIN

def list_tasks(filters, userId, id):
    try:
        work_area_query = (
            WorkArea
            .select()
            .join(MemberWorkArea, JOIN.LEFT_OUTER, on=(MemberWorkArea.work_area == WorkArea.id))
            .where(
                WorkArea.id == id,
                (WorkArea.owner == userId) | (MemberWorkArea.user == userId)
            )
        )

        if not work_area_query.exists():
            return jsonify({'error': 'Forbidden: User does not have access to this work area'}), 403

        page = int(filters.get('page', 1))
        status = filters.get('status')
        text = filters.get('text')

        query = (
            Task
            .select()
            .join(WorkArea, on=(Task.work_area == WorkArea.id))
            .join(MemberWorkArea, JOIN.LEFT_OUTER, on=(MemberWorkArea.work_area == WorkArea.id))
            .where(
                WorkArea.id == id,
                (WorkArea.owner == userId) | (MemberWorkArea.user == userId)
            )
        )

        if status:
            query = query.where(Task.status == status)

        if text:
            query = query.where(Task.title.contains(text))

        tasks = query.order_by(Task.created_at.desc()).limit(10).offset((page - 1) * 10)
        task_total = query.count()

        if not tasks:
            return jsonify({ 'tasks': [], 'total': 0 }), 200

        tasks_obj = {
            'tasks': [
                {
                    'id': task.id,
                    'title': task.title,
                    'description': task.description,
                    'status': task.status,
                    'user': {
                        'id': task.user.id,
                        'username': task.user.username,
                        'email': task.user.email,
                        'image_url': task.user.image_url
                    } if task.user else None,
                    'timeEstimate': task.time_estimate.isoformat() if task.time_estimate else None,
                    'createdAt': task.created_at.isoformat(),
                    'updatedAt': task.updated_at.isoformat()
                } for task in tasks
            ],
            'total': task_total
        }

        return jsonify(tasks_obj), 200

    except DoesNotExist:
        return jsonify({ 'tasks': [], 'total': 0 }), 404
    except IntegrityError:
        return jsonify({'error': 'Failed to retrieve tasks due to database error'}), 500
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
