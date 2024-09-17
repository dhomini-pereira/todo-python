import datetime
from src.config.database import BaseModel
from peewee import AutoField, CharField, DateTimeField

class User(BaseModel):
    id = AutoField()
    username = CharField(max_length=255, unique=True)
    email = CharField(max_length=255, unique=True)
    password = CharField(max_length=255)
    created_at = DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        db_table = 'users'