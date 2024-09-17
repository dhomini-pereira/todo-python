import os
import jwt

SECRET = os.getenv("SECRET_TOKEN")

def decodificar_token(token):
    try:
        payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {'error': 'Token expirado'}
    except jwt.InvalidTokenError:
        return {'error': 'Token inválido'}