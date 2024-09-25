from flask import Flask, request, jsonify
from flask_cors import CORS
from src.controllers.user.create_user import create_user
from src.controllers.user.login_user import login_user
from src.controllers.task.list_tasks import list_tasks
from src.controllers.task.del_task import del_task
from src.controllers.task.find_task import find_task
from src.controllers.user.remove_user import remove_user
from src.controllers.task.edit_task import edit_task
from src.utils.decode_token import decode_token
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.before_request
def validar_token():
    if request.path in ['/signup', '/signin']:
        return None
    
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "Token não fornecido"}), 401

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
    return 'update user'

@app.get("/task")
def list_of_tasks():
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    data = request.args
    return list_tasks(data, userId)

@app.get("/task/<id>")
def get_task(id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return find_task(id, userId)

@app.post("/task")
def create_task(id):
    return f'create task {id}'

@app.delete("/task/<id>")
def delete_task(id):
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return del_task(id, userId)

@app.put("/task/<id>")
def update_task(id):
    data = request.json
    userId = decode_token(request.headers.get('Authorization')).get('data').get('id')
    return edit_task(id, data, userId)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)