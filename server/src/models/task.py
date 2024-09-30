import enum
import datetime
from peewee import AutoField, CharField, TextField, DateTimeField, ForeignKeyField
from src.config.base_model import BaseModel
from src.models.user import User
from src.models.work_area import WorkArea

class Status(enum.Enum):
    PENDING = 'PENDING'
    PROGRESSING = 'PROGRESSING'
    DONE = 'DONE'

class Task(BaseModel):
    id = AutoField()
    title = CharField(max_length=255)
    description = TextField(null=True)
    status = CharField(max_length=20, default=Status.PENDING.value)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    work_area = ForeignKeyField(WorkArea, backref='tasks', on_delete='CASCADE')
    user = ForeignKeyField(User, null=True, backref='tasks')

    class Meta:
        db_table = 'tasks'