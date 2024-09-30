import boto3
import base64
import os
import datetime

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

def r2_image(base64_string, userId):
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    image_data = base64.b64decode(base64_string)

    s3_client.put_object(
        Bucket=R2_BUCKET_NAME,
        Key=f'{userId}.jpg',
        Body=image_data,
        ContentType='image/jpeg'
    )

    return f'https://pub-1e774adbecc2425fb049dc46d39cc1bb.r2.dev/{userId}.jpg'