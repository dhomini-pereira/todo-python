import datetime
from src.config.base_model import BaseModel
from peewee import AutoField, CharField, DateTimeField

class User(BaseModel):
    id = AutoField()
    username = CharField(max_length=255, unique=True)
    email = CharField(max_length=255, unique=True)
    password = CharField(max_length=255)
    image_url = CharField(max_length=255, null=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        db_table = 'users'