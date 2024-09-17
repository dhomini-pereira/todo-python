from flask import Flask, request
from src.controllers.user.create_user import create_user

app = Flask(__name__)

@app.post("/register")
def register():
    data = request.json
    return create_user(data)

@app.post("/loggedin")
def loggedin():
    return 'loggedin'

@app.get("/task")
def list_tasks():
    return 'list tasks'

@app.get("/task/<id>")
def find_task(id):
    return f'find task {id}'

@app.post("/task/<id>")
def create_task(id):
    return f'create task {id}'

@app.delete("/task/<id>")
def delete_task(id):
    return f'delete task {id}'

@app.put("/task/<id>")
def update_task(id):
    return f'update task {id}'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)