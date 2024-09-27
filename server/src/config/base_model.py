from peewee import *
from dotenv import load_dotenv
from src.config.database import pg_db

class BaseModel(Model):
    class Meta:
        database = pg_db