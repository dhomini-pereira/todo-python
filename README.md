# Comandos do GIT

- Comando usado para copiar o repositório do GitHub na sua máquina
```bash
git clone <url>
```

_(Selecione o projeto que você vai fazer alterações [pasta: server ou client])
<br>
(Abra o terminal dentro de um desses projetos)_

> **ATENÇÃO:** SEMPRE QUE FOR FAZER ALTERAÇÔES NO PROJETO, UTILIZE O COMANDO "git pull origin master" PARA TRAZER AS INFORMAÇÕES ATUALIZADAS

- Exibe a branch em que você está e as branchs existentes na sua máquina
```bash
git branch
```

- Troca de branch (Que já existe)
```bash
git checkout <branch>
```

- Cria uma nova branch local (Não está no GitHub ainda)
```bash
git checkout -b <branch_name>
```

- Puxa as alterações da branch do GitHub para a sua branch local
```bash
git pull origin <branch>
```

- Adiciona todas as suas alterações para serem enviadas no próximo commit
```bash
git add .
```

- Empacota as alterações e define a mensagem do commit
```bash
git commit -m "<mensagem>"
```

- Envia seu commit com as alterações e a mensagem para sua branch do GitHub
```bash
git push origin <branch>
```

**(Terminado isso, abra o GitHub e faça um Pull Request com "base": "master" e "compare": <sua_branch>**