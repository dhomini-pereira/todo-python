letra = input("Digite a letra correspondente ao sexo (F para Feminino, M para Masculino): ").strip().upper()

if letra == "F":
    print("F - Feminino")
elif letra == "M":
    print("M - Masculino")
else:
    print("Sexo Inválido")
