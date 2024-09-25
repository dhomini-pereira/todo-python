from src.models.task import Task
from flask import jsonify

def list_tasks(filters, userId):
    page = int(filters.get('page', 1))
    status = filters.get('status')
    text = filters.get('text')
    
    query = Task.select().where(Task.user_id == userId)
    
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
