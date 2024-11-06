import os

def cadastrar_aluno():
    nome = input("Digite o nome do aluno: ")
    email = input("Digite o e-mail do aluno: ")
    curso = input("Digite o curso do aluno: ")

    with open("alunos.txt", "a") as arquivo:
        arquivo.write(f"{nome};{email};{curso}\n")
    
    print(f"Aluno {nome} cadastrado com sucesso!")

def listar_alunos():
    
    if os.path.exists("alunos.txt"):
        with open("alunos.txt", "r") as arquivo:
            alunos = arquivo.readlines()
            if alunos:
                print("\nLista de alunos cadastrados:")
                for aluno in alunos:
                    nome, email, curso = aluno.strip().split(';')
                    print(f"Nome: {nome}, E-mail: {email}, Curso: {curso}")
            else:
                print("Nenhum aluno cadastrado.")
    else:
        print("Arquivo de alunos não encontrado.")

def buscar_aluno():
    nome_busca = input("Digite o nome do aluno a ser buscado: ")

    if os.path.exists("alunos.txt"):
        with open("alunos.txt", "r") as arquivo:
            alunos = arquivo.readlines()
            encontrado = False
            for aluno in alunos:
                nome, email, curso = aluno.strip().split(';')
                if nome.lower() == nome_busca.lower():
                    print(f"\nAluno encontrado: Nome: {nome}, E-mail: {email}, Curso: {curso}")
                    encontrado = True
                    break
            if not encontrado:
                print(f"Aluno com nome '{nome_busca}' não encontrado.")
    else:
        print("Arquivo de alunos não encontrado.")

def menu():
    while True:
        print("\nSistema de Registro de Notas")
        print("1 - Cadastrar um novo aluno")
        print("2 - Listar alunos cadastrados")
        print("3 - Buscar um aluno pelo nome")
        print("4 - Sair")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_aluno()
        elif opcao == "2":
            listar_alunos()
        elif opcao == "3":
            buscar_aluno()
        elif opcao == "4":
            print("Saindo do sistema...")
            break
        else:
            print("Opção inválida. Tente novamente.")
menu()
