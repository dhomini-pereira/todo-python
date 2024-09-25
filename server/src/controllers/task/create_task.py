from src.models.task import Task
from flask import jsonify

def create_task(userId, data):
    if not data.get('title') or not data.get('description'):
        return jsonify({ 'error': 'Invalid data' }), 400
    
    task = Task(
        user_id = userId,
        title = data.get('title'),
        description = data.get('description')
    )
    task.save()
    
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status,
        'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updatedAt': task.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    }), 201