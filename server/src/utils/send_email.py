import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os

def send_email(email, token):
    email_origem = os.getenv("EMAIL")
    senha = os.getenv("PASS_EMAIL")
    email_destino = email
    assunto = "Forgot Password"
    mensagem = "URL para trocar a senha: {}".format(
        f"http://{os.getenv("DB_HOST")}/reset-password?token={token}"
    )
    msg = MIMEMultipart()
    msg["From"] = email_origem
    msg["To"] = email_destino
    msg["Subject"] = assunto
    msg.attach(MIMEText(mensagem, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(email_origem, senha)
        server.sendmail(email_origem, email_destino, msg.as_string())
