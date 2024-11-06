def inserir_aluno(matricula, nome, curso):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT INTO Aluno (Matricula, Nome, Curso) 
                VALUES (?, ?, ?)
            """, (matricula, nome, curso))
            conn.commit()
            print(f"Aluno {nome} inserido com sucesso.")
        except sqlite3.Error as e:
            print(f"Erro ao inserir aluno: {e}")
        finally:
            conn.close()

def inserir_nota(item, matricula, valor):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT INTO Nota (Item, Matricula, Valor) 
                VALUES (?, ?, ?)
            """, (item, matricula, valor))
            conn.commit()
            print(f"Nota {item} inserida com sucesso para o aluno {matricula}.")
        except sqlite3.Error as e:
            print(f"Erro ao inserir nota: {e}")
        finally:
            conn.close()

def excluir_aluno(matricula):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("DELETE FROM Nota WHERE Matricula = ?", (matricula,)) 
            cursor.execute("DELETE FROM Aluno WHERE Matricula = ?", (matricula,))  
            conn.commit()
            print(f"Aluno de matrícula {matricula} excluído com sucesso.")
        except sqlite3.Error as e:
            print(f"Erro ao excluir aluno: {e}")
        finally:
            conn.close()

def modificar_aluno(matricula, novo_nome, novo_curso):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                UPDATE Aluno 
                SET Nome = ?, Curso = ? 
                WHERE Matricula = ?
            """, (novo_nome, novo_curso, matricula))
            conn.commit()
            print(f"Aluno de matrícula {matricula} atualizado com sucesso.")
        except sqlite3.Error as e:
            print(f"Erro ao modificar aluno: {e}")
        finally:
            conn.close()
def modificar_nota(item, matricula, novo_valor):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                UPDATE Nota 
                SET Valor = ? 
                WHERE Item = ? AND Matricula = ?
            """, (novo_valor, item, matricula))
            conn.commit()
            print(f"Nota {item} do aluno {matricula} atualizada com sucesso.")
        except sqlite3.Error as e:
            print(f"Erro ao modificar nota: {e}")
        finally:
            conn.close()

def listar_alunos():
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Aluno")
        alunos = cursor.fetchall()
        print("Alunos cadastrados:")
        for aluno in alunos:
            print(f"Matrícula: {aluno[0]}, Nome: {aluno[1]}, Curso: {aluno[2]}")
        conn.close()

def listar_notas(matricula):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT N.Item, N.Valor 
            FROM Nota N
            JOIN Aluno A ON N.Matricula = A.Matricula
            WHERE A.Matricula = ?
        """, (matricula,))
        notas = cursor.fetchall()
        print(f"Notas do aluno de matrícula {matricula}:")
        for nota in notas:
            print(f"Item: {nota[0]}, Valor: {nota[1]}")
        conn.close()