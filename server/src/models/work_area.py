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
    name = CharField()
    type_work_area = CharField()
    owner = ForeignKeyField(User, backref='owned_workareas')
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)

    class Meta:
        db_table = 'work_area'