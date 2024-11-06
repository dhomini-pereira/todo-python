CREATE TABLE Nota (
    Item INT PRIMARY KEY,        -- Identificador da avaliação (item) - chave primária
    Matricula INT,               -- Matrícula do aluno (chave estrangeira)
    Valor DECIMAL(5,2),          -- Valor da nota do aluno
    FOREIGN KEY (Matricula) REFERENCES Aluno(Matricula)  -- Relacionamento com a tabela Aluno
);
