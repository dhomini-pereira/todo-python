import os
import jwt

SECRET = os.getenv("SECRET_TOKEN")

def decode_token(token):
    try:
        token = token.split(' ')[1]
        payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {'error': 'Token expirado'}
    except jwt.InvalidTokenError:
        return {'error': 'Token inválido'}