## API em Python - Desenvolvimento Rápido de Aplicações em Python

Esta é uma API criada utilizando Flask para definição de Endpoints para a busca dos dados para compor o Front-End que está em NextJS.

### Instalação

1. Clone este repositório.
2. Instale as dependências: `pip install -r requirements.txt`.
3. Defina as variáveis de ambiente no `.env` utilizando o modelo do `example.env`.

### Execução

1. Execute o servidor: `python3 app.py`

### Endpoints

| Rota                       | Método | Descrição                | Necessita de autorização |
| -------------------------- | ------ | ------------------------ | ------------------------ |
| `/signin`                  | POST   | Autentica um usuário     | ❌                       |
| `/signup`                  | POST   | Registra um usuário      | ❌                       |
| `/user`                    | PUT    | Atualiza um usuário      | ✅                       |
| `/user`                    | DELETE | Exclui um usuário        | ✅                       |
| `/workarea/<id>/task`      | GET    | Busca todas as Tasks     | ✅                       |
| `/workarea/<id>/task`      | POST   | Cria uma nova Task       | ✅                       |
| `/workarea/<id>/task/<id>` | GET    | Busca uma Task por ID    | ✅                       |
| `/workarea/<id>/task/<id>` | PUT    | Atualiza uma Task por ID | ✅                       |
| `/workarea/<id>/task/<id>` | DELETE | Exclui uma Task por ID   | ✅                       |
| `/workarea`                | GET    | Busca todas as Workareas | ✅                       |
| `/workarea`                | POST   | Cria uma nova Workarea   | ✅                       |`

### Segurança

A API utiliza JWT para autenticação e autorização.

### Contribuições

Contribuições são bem-vindas! Abra um problema ou um pull request.

### Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
