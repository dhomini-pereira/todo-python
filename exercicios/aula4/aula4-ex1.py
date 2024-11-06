import os

def validar_nome(nome):
    if nome.isalpha():
        return True
    else:
        return False
def validar_matricula(matricula):
    return matricula.isdigit()
def cadastrar_aluno():
    while True:
        nome = input("Digite o nome do aluno: ").strip()
        if not nome:
            print("O nome não pode ser vazio. Tente novamente.")
        elif not validar_nome(nome):
            print("O nome não pode conter números. Tente novamente.")
        else:
            break

    while True:
        matricula = input("Digite o número de matrícula do aluno: ").strip()
        if not matricula:
            print("A matrícula não pode ser vazia. Tente novamente.")
        elif not validar_matricula(matricula):
            print("A matrícula deve conter apenas números. Tente novamente.")
        else:
            break

    email = input("Digite o e-mail do aluno: ").strip()
    curso = input("Digite o curso do aluno: ").strip()

    try:
        with open("alunos.txt", "a") as arquivo:
            arquivo.write(f"{nome};{matricula};{email};{curso}\n")
        print(f"Aluno {nome} cadastrado com sucesso!")
    except PermissionError:
        print("Erro: Sem permissão para escrever no arquivo 'alunos.txt'.")
    except Exception as e:
        print(f"Erro ao cadastrar aluno: {e}")
def listar_alunos():
    try:
        if os.path.exists("alunos.txt"):
            with open("alunos.txt", "r") as arquivo:
                alunos = arquivo.readlines()
                if alunos:
                    print("\nLista de alunos cadastrados:")
                    for aluno in alunos:
                        nome, matricula, email, curso = aluno.strip().split(';')
                        print(f"Nome: {nome}, Matrícula: {matricula}, E-mail: {email}, Curso: {curso}")
                else:
                    print("Nenhum aluno cadastrado.")
        else:
            print("Arquivo 'alunos.txt' não encontrado.")
    except FileNotFoundError:
        print("Erro: O arquivo 'alunos.txt' não existe.")
    except Exception as e:
        print(f"Erro ao listar alunos: {e}")
def buscar_aluno():
    nome_busca = input("Digite o nome do aluno a ser buscado: ").strip()
    
    try:
        if os.path.exists("alunos.txt"):
            with open("alunos.txt", "r") as arquivo:
                alunos = arquivo.readlines()
                encontrado = False
                for aluno in alunos:
                    nome, matricula, email, curso = aluno.strip().split(';')
                    if nome.lower() == nome_busca.lower():
                        print(f"\nAluno encontrado: Nome: {nome}, Matrícula: {matricula}, E-mail: {email}, Curso: {curso}")
                        encontrado = True
                        break
                if not encontrado:
                    print(f"Aluno com nome '{nome_busca}' não encontrado.")
        else:
            print("Arquivo 'alunos.txt' não encontrado.")
    except FileNotFoundError:
        print("Erro: O arquivo 'alunos.txt' não existe.")
    except Exception as e:
        print(f"Erro ao buscar aluno: {e}")
def menu():
    while True:
        print("\nSistema de Registro de Notas")
        print("1 - Cadastrar um novo aluno")
        print("2 - Listar alunos cadastrados")
        print("3 - Buscar um aluno pelo nome")
        print("4 - Sair")

        try:
            opcao = input("Escolha uma opção: ").strip()

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
        except Exception as e:
            print(f"Erro no menu: {e}")

menu()
