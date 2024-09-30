from src.models.task import Task
from flask import jsonify
from src.models.work_area import WorkArea
from src.models.member_work_area import MemberWorkArea
from peewee import JOIN
import datetime

def edit_task(workarea_id, id, data, userId):
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
        return jsonify({ 'error': 'Task not found' }), 404
    
    if not data:
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if not data.get('title') and not data.get('description') and not data.get('status') and not data.get('user_id'):
        return jsonify({ 'error': 'Invalid data' }), 400
    
    if (data.get('title')):
        task.title = data.get('title')
    
    if (data.get('description')):
        task.description = data.get('description')
    
    if (data.get('status')):
        task.status = data.get('status')

    if (data.get('user_id')):
        task.user = data.get('user_id')
        
    task.updated_at = datetime.datetime.now()
    
    task.save()
    
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status,
        'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updatedAt': task.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    }), 200