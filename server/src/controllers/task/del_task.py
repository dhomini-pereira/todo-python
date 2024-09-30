from src.models.task import Task
from src.models.work_area import WorkArea
from src.models.member_work_area import MemberWorkArea
from peewee import JOIN
from flask import jsonify

def del_task(workarea_id, id, userId):
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
    
    task.delete_instance()
    
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status,
        'createdAt': task.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updatedAt': task.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    }), 200