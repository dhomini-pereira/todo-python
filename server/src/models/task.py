import enum
import datetime
from peewee import AutoField, CharField, TextField, DateTimeField, ForeignKeyField
from src.config.database import BaseModel
from src.models.user import User

class Status(enum.Enum):
    PENDING = 'PENDING'
    PROGRESSING = 'PROGRESSING'
    DONE = 'DONE'

class Task(BaseModel):
    id = AutoField()
    title = CharField(max_length=255)
    description = TextField(null=True)
    status = CharField(max_length=255, default="PENDING")
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    user_id = ForeignKeyField(User, backref='tasks', on_delete='CASCADE')

    class Meta:
        db_table = 'tasks'