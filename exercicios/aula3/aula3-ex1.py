with open("crescente.txt", "w") as arquivo:

    numeros = [str(i) for i in range(1, 101)]
    
    arquivo.write(";".join(numeros))

print("Arquivo 'crescente.txt' criado com sucesso!")
