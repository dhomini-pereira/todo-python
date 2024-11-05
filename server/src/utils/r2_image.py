import boto3
import base64
import os
from datetime import datetime
from urllib.parse import urlparse

R2_ENDPOINT_URL = os.getenv("R2_ENDPOINT_URL")
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME")

s3_client = boto3.client(
    's3',
    endpoint_url=R2_ENDPOINT_URL,
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_ACCESS_KEY,
    region_name='auto',
)

def r2_image(base64_string, userId, oldFileUrl=None):
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    image_data = base64.b64decode(base64_string)
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    file_key = f'{userId}.{timestamp}.jpg'

    if oldFileUrl:
        try:
            old_file_key = urlparse(oldFileUrl).path.lstrip('/')
            s3_client.delete_object(Bucket=R2_BUCKET_NAME, Key=old_file_key)
            print(f'Arquivo antigo {old_file_key} deletado com sucesso.')
        except Exception as e:
            print(f'Erro ao deletar o arquivo {oldFileUrl}: {str(e)}')

    s3_client.put_object(
        Bucket=R2_BUCKET_NAME,
        Key=file_key,
        Body=image_data,
        ContentType='image/jpeg'
    )

    return f'https://pub-1e774adbecc2425fb049dc46d39cc1bb.r2.dev/{file_key}'
