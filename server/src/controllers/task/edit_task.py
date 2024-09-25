from src.models.task import Task
from flask import jsonify
import datetime

def edit_task(id, data, userId):
    task = Task.get(
        Task.user_id == userId,
        Task.id==id
    )
    
    if not task:
        return jsonify({ 'error': 'Task not found' }), 404
    
    if not data:
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if not data.get('title') and not data.get('description') and not data.get('status'):
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if (data.get('title')):
        task.title = data.get('title')
    
    if (data.get('description')):
        task.description = data.get('description')
    
    if (data.get('status')):
        task.status = data.get('status')
        
    task.updated_at = datetime.datetime.now()
    
    task.save()
    
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status,
        'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updatedAt': task.updated.at.strftime('%Y-%m-%d %H:%M:%S')
    }), 200