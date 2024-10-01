from peewee import DoesNotExist, IntegrityError
from src.models.user import User

def remove_user(userId):
    try:
        user = User.get(User.id == userId)
        user.delete_instance()
        return 200
    except DoesNotExist:
        return {'error': 'Usuário não encontrado'}, 404
    except IntegrityError:
        return {'error': 'Erro de integridade no banco de dados'}, 500
    except Exception as e:
        return {'error': f'Ocorreu um erro inesperado: {str(e)}'}, 500
