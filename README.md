# ToDo Python

Este é um MonoRepo do projeto de ToDo, que inclui o Front-End e Back-End para a aula de Desenvolvimento Rápido de Aplicações em Python.

> [Clique aqui para ir até o site](http://ec2-15-228-254-16.sa-east-1.compute.amazonaws.com)

## Descrição do Projeto

O Front-End foi desenvolvido utilizando **Next.js**, proporcionando uma experiência de usuário dinâmica e responsiva. O Back-End foi implementado com **Flask**, utilizando Python, que se comunica com um banco de dados **SQL** para gerenciar as informações da aplicação. Todo o projeto está hospedado na **AWS**, garantindo alta disponibilidade e desempenho.

## Emulando o Back-End

1. Instalando dependências:
```bash
pip install --no-cache-dir -r ./server/requirements.txt
```
2. Definindo variáveis de ambiente (arquivo ./server/.env):
```env
DB_USER=?
DB_PASS=?
DB_HOST=?
DB_NAME=?
SECRET_TOKEN=?
SECRET_TOKEN_EMAIL=?
EMAIL=?
PASS_EMAIL=?
R2_ENDPOINT_URL=?
R2_ACCESS_KEY_ID=?
R2_SECRET_ACCESS_KEY=?
R2_BUCKET_NAME=?
``` 
4. Iniciando aplicação:
```bash
python ./server/app.py
```

## Emulando Front-End

1. Instalando dependências
```bash
npm install
```
2. Iniciando aplicação:
```bash
npm run dev
```

## Integrantes do Projeto
- Magno Durães de Barros Filho
- Dhomini da Silva Pereira
- Renato Carvalho Assunção da Silva
- Gabriel dos Santos Reis
- Lucas Ribeiro Rodrigues

### Acesse o site pelo QR Code:

[![QR Code para acesso ao site](https://pub-1e774adbecc2425fb049dc46d39cc1bb.r2.dev/downloads/qr_code.png)](http://ec2-15-228-254-16.sa-east-1.compute.amazonaws.com)
