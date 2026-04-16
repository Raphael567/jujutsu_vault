CREATE DATABASE jujutsu_vault;

USE jujutsu_vault;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50)
);

CREATE TABLE pergunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255)
);

CREATE TABLE resposta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    correta TINYINT(1),
    fk_pergunta INT,
    FOREIGN KEY (fk_pergunta) REFERENCES pergunta(id)
);

CREATE TABLE tentativa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pontuacao INT,
    _data DATETIME,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE resposta_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_tentativa INT,
    fk_resposta INT,
    FOREIGN KEY (fk_tentativa) REFERENCES tentativa(id),
    FOREIGN KEY (fk_resposta) REFERENCES resposta(id)
);

INSERT INTO usuario (nome, email, senha) VALUES
('Raphael', 'raphael@email.com', '123'),
('teste', 'teste@email.com', '123');

INSERT INTO pergunta (descricao) VALUES
('Qual é o nome completo do protagonista de Jujutsu Kaisen?'),
('Quem é conhecido como o feiticeiro mais forte?'),
('Qual é o nome da escola onde os feiticeiros estudam em Tóquio?'),
('Qual é o nome da maldição mais poderosa que habita o corpo de Yuji?'),
('Qual técnica amaldiçoada permite manipular o infinito?');

-- Pergunta 1
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Yuji Itadori', 1, 1),
('Megumi Fushiguro', 0, 1),
('Yuta Okkotsu', 0, 1),
('Toge Inumaki', 0, 1);

-- Pergunta 2
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Satoru Gojo', 1, 2),
('Suguru Geto', 0, 2),
('Kento Nanami', 0, 2),
('Toji Fushiguro', 0, 2);

-- Pergunta 3
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Colégio Técnico de Jujutsu de Tóquio', 1, 3),
('Academia de Feiticeiros de Kyoto', 0, 3),
('Instituto Jujutsu Central', 0, 3),
('Escola de Exorcistas do Japão', 0, 3);

-- Pergunta 4
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Ryomen Sukuna', 1, 4),
('Mahito', 0, 4),
('Jogo', 0, 4),
('Hanami', 0, 4);

-- Pergunta 5
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Ilimitado', 1, 5),
('Black Flash', 0, 5),
('Técnica das Dez Sombras', 0, 5),
('Fala Amaldiçoada', 0, 5);

INSERT INTO tentativa (pontuacao, _data, fk_usuario) VALUES
(4, NOW(), 1);

INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(1, 1),  -- Yuji (correto)
(1, 5),  -- Gojo (correto)
(1, 9),  -- Escola (correto)
(1, 13), -- Sukuna (correto)
(1, 18); -- Black Flash (errou)

INSERT INTO tentativa (pontuacao, _data, fk_usuario) VALUES
(2, NOW(), 2);

INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(1, 1),  -- Yuji (correto)
(1, 5),  -- Gojo (correto)
(1, 8),  -- Instituto (errou)
(1, 14), -- Mahito (errou)
(1, 18); -- Black Flash (errou)

-- perguntas com respostas (quiz)
SELECT 
    p.id AS id_pergunta,
    p.descricao AS pergunta,
    r.id AS id_resposta,
    r.descricao AS resposta,
    r.correta AS correta
FROM pergunta p
JOIN resposta r ON r.fk_pergunta = p.id;

-- respostas de uma pergunta específica
SELECT 
    id,
    descricao
FROM resposta
WHERE fk_pergunta = 1 AND correta = 1;

-- usuário acertou na tentativa
SELECT 
    ru.fk_tentativa,
    u.nome,
    p.descricao,
    r.descricao,
    r.correta
FROM resposta_usuario ru
JOIN resposta r ON ru.fk_resposta = r.id
JOIN pergunta p ON r.fk_pergunta = p.id
JOIN tentativa t ON ru.fk_tentativa = t.id
JOIN usuario u ON t.fk_usuario = u.id
WHERE ru.fk_tentativa = 1;

-- pontuacao específica
SELECT 
    u.nome,
    SUM(t.pontuacao) AS total_pontos
FROM usuario u
JOIN tentativa t ON u.id = t.fk_usuario
WHERE u.id = 1
GROUP BY u.id
ORDER BY total_pontos DESC;

-- pontuacao geral
SELECT 
    u.nome,
    SUM(t.pontuacao) AS total_pontos
FROM usuario u
JOIN tentativa t ON u.id = t.fk_usuario
GROUP BY u.id
ORDER BY total_pontos DESC;