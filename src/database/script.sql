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
    descricao VARCHAR(255),
    caminho_gif VARCHAR(255)
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
    tempo_segundos INT,
    data_tentativa DATETIME,
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
('Teste', 'teste@email.com', '123');

INSERT INTO pergunta (descricao, caminho_gif) VALUES
('Qual é o nome completo do protagonista de Jujutsu Kaisen?', 'https://giffiles.alphacoders.com/211/211840.gif'),
('Quem é conhecido como o feiticeiro mais forte?', 'https://giffiles.alphacoders.com/211/211810.gif'),
('Qual é o nome da escola onde os feiticeiros estudam em Tóquio?', 'https://i.pinimg.com/originals/88/d9/3e/88d93e0aab6efc10d61607021750e3fc.gif'),
('Qual é o nome da maldição mais poderosa que habita o corpo de Yuji?', 'https://giffiles.alphacoders.com/211/211834.gif'),
('Qual técnica amaldiçoada permite manipular o infinito?', 'https://64.media.tumblr.com/e9af0cb7a4743216a90c239b9fd0638b/148151f997a45335-74/s1280x1920/1d34db2b5efd164d8d5c8fc1d6ce86203c48bc7c.gifv');

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

-- Raphael
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(4, 150, NOW(), 1);

-- Raphael
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(3, 80, NOW(), 1);

-- Raphael
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(2, 50, NOW(), 1);

-- Teste
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(2, 210, NOW(), 2);

-- Tentativa 1 (Raphael)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(1, 1),
(1, 5),
(1, 9),
(1, 13),
(1, 18);

-- Tentativa 2 (Teste)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(2, 1),
(2, 5),
(2, 11),
(2, 14),
(2, 18);

CREATE VIEW tentativas_usuario AS
SELECT
    u.id AS id_usuario,
    u.nome AS nome,
    t.pontuacao AS pontuacao,
    t.tempo_segundos AS tempo,
    DATE_FORMAT(t.data_tentativa, '%d/%m') AS data_tentativa
FROM usuario u
JOIN tentativa t ON u.id = t.fk_usuario;

SELECT
	data_tentativa,
    pontuacao,
    tempo
FROM tentativas_usuario 
WHERE id_usuario = 1;

SELECT
	id_usuario,
	nome,
    pontuacao,
    tempo
FROM tentativas_usuario;

CREATE VIEW perguntas_respostas AS
SELECT 
    p.id AS id_pergunta,
    p.descricao AS pergunta,
    p.caminho_gif AS gif,
    r.id AS id_resposta,
    r.descricao AS resposta,
    r.correta
FROM pergunta p
JOIN resposta r ON r.fk_pergunta = p.id
ORDER BY p.id;

CREATE VIEW respostas_usuarios AS
SELECT 
    ru.fk_tentativa,
    u.nome,
    p.descricao AS pergunta,
    r.descricao AS resposta,
    r.correta AS correta
FROM resposta_usuario ru
JOIN resposta r ON ru.fk_resposta = r.id
JOIN pergunta p ON r.fk_pergunta = p.id
JOIN tentativa t ON ru.fk_tentativa = t.id
JOIN usuario u ON t.fk_usuario = u.id;

CREATE VIEW ranking AS
SELECT
	u.id,
    u.nome,
    t.pontuacao,
    t.tempo_segundos,
    DATE_FORMAT(t.data_tentativa, '%d/%m') AS data_tentativa
FROM tentativa t
JOIN usuario u ON u.id = t.fk_usuario;

SELECT 
    r.id,
    r.nome,
    CONCAT(r.pontuacao, '/', (
        SELECT COUNT(*) FROM pergunta
    )) AS pontuacao,
    r.tempo_segundos,
    r.data_tentativa
FROM ranking r
ORDER BY r.pontuacao DESC, r.tempo_segundos ASC;
