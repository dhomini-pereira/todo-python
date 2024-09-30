from src.models.task import Task
from flask import jsonify
from peewee import JOIN
from src.models.member_work_area import MemberWorkArea
from src.models.work_area import WorkArea

def create_task(userId, data, workarea_id):
    if not data.get('title') or not data.get('description'):
        return jsonify({ 'error': 'Invalid data' }), 400

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
    
    if not workarea:
        return jsonify({ 'error': 'Work area not found' }), 404

    task = Task(
        title = data.get('title'),
        description = data.get('description'),
        work_area = workarea_id
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