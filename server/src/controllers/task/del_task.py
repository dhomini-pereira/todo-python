from src.models.task import Task
from flask import jsonify

def del_task(id, userId):
    task = Task.get(
        Task.user_id == userId,
        Task.id==id
    )
    
    if not task:
        return jsonify({ 'error': 'Task not found' }), 404
    
    task.delete_instance()
    
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status,
        'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updatedAt': task.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    }), 200