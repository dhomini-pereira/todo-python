while True:
    
    nota = float(input("Digite uma nota entre 0 e 10: "))
    
    if 0 <= nota <= 10:
        print(f"Nota válida: {nota}.")
        break  
    else:
        print("Valor inválido! Tente novamente.")
