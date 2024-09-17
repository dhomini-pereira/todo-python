import datetime
import jwt
import os

SECRET = os.getenv("SECRET_TOKEN")

def create_token(data):
    payload = {
        'data': data,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET, algorithm='HS256')
    return token