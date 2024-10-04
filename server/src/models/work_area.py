from src.config.base_model import BaseModel
from peewee import AutoField, CharField, DateTimeField, ForeignKeyField
from src.models.user import User
from datetime import datetime
import enum

class TypeWorkArea(enum.Enum):
    PERSONAL = 'PERSONAL'
    PROFESSIONAL = 'PROFESSIONAL'

class WorkArea(BaseModel):
    id = AutoField()
    name = CharField(max_length=255)
    type_work_area = CharField(max_length=255, choices=[(tag.name, tag.value) for tag in TypeWorkArea])
    owner = ForeignKeyField(User, backref='owned_workareas', on_delete='CASCADE')
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)

    class Meta:
        db_table = 'work_area'