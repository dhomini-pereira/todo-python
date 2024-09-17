from peewee import *
from dotenv import load_dotenv
import os
load_dotenv()

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_port = os.getenv("DB_PORT")
db_host = os.getenv("DB_HOST")
db_pass = os.getenv("DB_PASS")

pg_db = PostgresqlDatabase(
    db_name,
    user=db_user,
    password=db_pass,
    host=db_host,
    port=db_port
)

class BaseModel(Model):
    class Meta:
        database = pg_db