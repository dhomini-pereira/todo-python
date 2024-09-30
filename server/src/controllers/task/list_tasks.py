from src.models.task import Task
from src.models.work_area import WorkArea
from src.models.member_work_area import MemberWorkArea
from peewee import JOIN
from flask import jsonify

def list_tasks(filters, userId, id):
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
    
    tasks_obj = {
        'tasks': [
            {
                'id': task.id,
                'title': task.title,
                'description': task.description,
                'status': task.status,
                'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'updatedAt': task.updated_at.strftime('%Y-%m-%d %H:%M:%S')
            } for task in tasks
        ],
        'total': task_total
    }
    
    return jsonify(tasks_obj)
