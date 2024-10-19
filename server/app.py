from flask import Flask, request, jsonify
from flask_cors import CORS
from src.controllers.user.create_user import create_user
from src.controllers.user.login_user import login_user
from src.controllers.task.list_tasks import list_tasks
from src.controllers.task.del_task import del_task
from src.controllers.task.find_task import find_task
from src.controllers.user.remove_user import remove_user
from src.controllers.task.edit_task import edit_task
from src.controllers.user.edit_user import edit_user
from src.controllers.task.create_task import create_task
from src.controllers.workareas.list_workareas import list_workareas
from src.controllers.workareas.delete_workarea import delete_workarea
from src.controllers.workareas.user_in_workarea import user_in_workarea
from src.controllers.workareas.remove_user_workarea import remove_user_workarea
from src.controllers.workareas.create_workarea import create_workarea
from src.controllers.workareas.find_workarea import find_workarea
from src.controllers.workareas.list_users_in_workarea import list_users_in_workarea
from src.utils.decode_token import decode_token
from flask_cors import CORS

# from src.config.database import pg_db
# from src.models.task import Task
# from src.models.user import User
# from src.models.work_area import WorkArea
# from src.models.member_work_area import MemberWorkArea

app = Flask(__name__)
CORS(app)

@app.before_request
def validar_token():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request allowed."}), 200
    
    if request.path in ['/signup', '/signin']:
        return None
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "Token não fornecido!"}), 401

    token_data = decode_token(auth_header)
    
    if 'error' in token_data:
        if token_data['error'] == 'Token expirado':
            return jsonify({"error": "Token expirado"}), 401
        else:
            return jsonify({"error": "Token inválido"}), 403

@app.post("/signup")
def signup():
    data = request.json
    return create_user(data)

@app.post("/signin")
def signin():
    data = request.json
    return login_user(data)

@app.delete("/user")
def delete_user():
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return remove_user(userId)

@app.put("/user")
def update_user():
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    data = request.json
    return edit_user(userId, data)

@app.get("/user")
def get_user():
    user = decode_token(request.headers.get('Authorization')).get('data')
    return jsonify(user)

@app.get("/workarea/<workarea_id>/task")
def list_of_tasks(workarea_id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    data = request.args
    return list_tasks(data, userId, workarea_id)

@app.get("/workarea")
def list_of_work_areas():
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return list_workareas(userId)

@app.get("/workarea/<workarea_id>/task/<id>")
def get_task(workarea_id, id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return find_task(workarea_id, id, userId)

@app.post("/workarea/<workarea_id>/task")
def post_task(workarea_id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    data = request.json
    return create_task(userId, data, workarea_id)

@app.delete("/workarea/<workarea_id>/task/<id>")
def delete_task(workarea_id, id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return del_task(workarea_id, id, userId)

@app.put("/workarea/<workarea_id>/task/<id>")
def update_task(workarea_id, id):
    data = request.json
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return edit_task(workarea_id, id, data, userId)

@app.delete("/workarea/<workarea_id>")
def remove_workarea(workarea_id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return delete_workarea(workarea_id, userId)

@app.get("/workarea/<workarea_id>")
def get_workarea(workarea_id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return find_workarea(workarea_id, userId)

@app.post("/workarea/<workarea_id>/member/<username>")
def insert_user_in_workarea(workarea_id, username):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return user_in_workarea(userId, workarea_id, username)

@app.delete("/workarea/<workarea_id>/member/<username>")
def remove_user_of_workarea(workarea_id, username):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return remove_user_workarea(userId, workarea_id, username)

@app.post("/workarea")
def new_workarea():
    data = request.json
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return create_workarea(userId, data)

@app.get("/workarea/<workarea_id>/member")
def list_member_in_workarea(workarea_id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return list_users_in_workarea(userId, workarea_id)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
    # pg_db.create_tables([User, WorkArea, MemberWorkArea, Task])
