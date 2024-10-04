from src.config.base_model import BaseModel
from peewee import DateTimeField, ForeignKeyField
from src.models.user import User
from datetime import datetime
from src.models.work_area import WorkArea

class MemberWorkArea(BaseModel):
    user = ForeignKeyField(User, backref='workareas', on_delete='CASCADE')
    work_area = ForeignKeyField(WorkArea, backref='members', on_delete='CASCADE')
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)

    class Meta:
        db_table = 'member_work_areas'