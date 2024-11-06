import sqlite3

def conectar_db():
    try:
        conn = sqlite3.connect('registro_notas.db')  
        return conn
    except sqlite3.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

def criar_tabelas():
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Aluno (
                Matricula INTEGER PRIMARY KEY,
                Nome TEXT,
                Curso TEXT
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Nota (
                Item INTEGER PRIMARY KEY,
                Matricula INTEGER,
                Valor DECIMAL(5,2),
                FOREIGN KEY (Matricula) REFERENCES Aluno(Matricula)
            )
        """)
        
        conn.commit()  
        conn.close()

def inserir_aluno(matricula, nome, curso):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO Aluno (Matricula, Nome, Curso) 
            VALUES (?, ?, ?)
        """, (matricula, nome, curso))
        conn.commit()
        conn.close()

def inserir_nota(item, matricula, valor):
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO Nota (Item, Matricula, Valor) 
            VALUES (?, ?, ?)
        """, (item, matricula, valor))
        conn.commit()
        conn.close()

def listar_alunos():
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Aluno")
        alunos = cursor.fetchall()
        for aluno in alunos:
            print(f'Matrícula: {aluno[0]}, Nome: {aluno[1]}, Curso: {aluno[2]}')
        conn.close()

