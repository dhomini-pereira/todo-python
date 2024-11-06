-- Buscar os dados do aluno pelo número da matrícula
SELECT A.Matricula, A.Nome, C.Nome AS Curso
FROM Aluno A
JOIN Curso C ON A.CursoID = C.CursoID
WHERE A.Matricula = ?; 

-- Listar todos os alunos de um determinado curso
SELECT A.Matricula, A.Nome
FROM Aluno A
JOIN Curso C ON A.CursoID = C.CursoID
WHERE C.Nome = ?;  

-- Mostrar as notas de todos os alunos, ordenados pelo nome
SELECT A.Nome AS Aluno, C.Nome AS Curso, N.Item, N.Valor
FROM Aluno A
JOIN Curso C ON A.CursoID = C.CursoID
JOIN Nota N ON A.Matricula = N.Matricula
ORDER BY A.Nome; 
