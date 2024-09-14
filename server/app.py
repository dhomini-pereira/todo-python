from flask import Flask

app = Flask(__name__)

@app.route('/hello', methods=["GET"])
def hello():
    return 'Hello, World!'

@app.route('/Girino', methods=["GET"])
def girino():
    return 'Hello, Girino'
    
@app.route('/renato', methods=['GET'])
def peixe():
    return 'Peixe espada'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)