CREATE DATABASE jujutsu_vault;

USE jujutsu_vault;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50),
    avatar VARCHAR(255) DEFAULT "./assets/icon/no_user.png"
);

CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NOT NULL,

    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE comentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conteudo TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_post INT NOT NULL,
    fk_usuario INT NOT NULL,

    FOREIGN KEY (fk_post) REFERENCES post(id),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE pergunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    caminho_local VARCHAR(255),
    caminho_url TEXT
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

INSERT INTO pergunta (descricao, caminho_local, caminho_url) VALUES
('Qual é o nome completo do protagonista de Jujutsu Kaisen?', './assets/gifs/yuji.gif', 'https://giffiles.alphacoders.com/211/211840.gif'),
('Quem é conhecido como o feiticeiro mais forte?', './assets/gifs/gojo.gif', 'https://giffiles.alphacoders.com/211/211810.gif'),
('Qual é o nome da escola onde os feiticeiros estudam em Tóquio?', './assets/gifs/opening.gif', 'https://i.pinimg.com/originals/88/d9/3e/88d93e0aab6efc10d61607021750e3fc.gif'),
('Qual é o nome da maldição mais poderosa que habita o corpo de Yuji?', './assets/gifs/sukuna.gif', 'https://giffiles.alphacoders.com/211/211834.gif'),
('Qual técnica amaldiçoada permite manipular o infinito?', './assets/gifs/gojo2.gif', 'https://64.media.tumblr.com/e9af0cb7a4743216a90c239b9fd0638b/148151f997a45335-74/s1280x1920/1d34db2b5efd164d8d5c8fc1d6ce86203c48bc7c.gifv');

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

-- Novas perguntas
INSERT INTO pergunta (descricao, caminho_local, caminho_url) VALUES
('Qual personagem utiliza a Técnica das Dez Sombras?', './assets/gifs/megumi.gif', 'https://giffiles.alphacoders.com/220/220159.gif'),
('Quem é o melhor amigo de Yuji no primeiro ano?', './assets/gifs/todou_yuji.gif', 'https://i.pinimg.com/originals/f0/65/33/f06533eea7b286622b7ab17d9b841cf6.gif'),
('Qual maldição possui poderes relacionados a vulcões?', './assets/gifs/jogo.gif', 'https://i.redd.it/80lldb7nve6f1.gif'),
('Qual personagem usa fala amaldiçoada como técnica?', './assets/gifs/inumaki.gif', 'https://i.pinimg.com/originals/10/01/2d/10012d13b32f83ea68b1c837f84991f7.gif'),
('Qual personagem derrotou Toji Fushiguro no passado?', './assets/gifs/toji.gif', 'https://i.makeagif.com/media/11-12-2023/9VSuhr.gif');

-- Pergunta 6
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Megumi Fushiguro', 1, 6),
('Yuji Itadori', 0, 6),
('Maki Zenin', 0, 6),
('Aoi Todo', 0, 6);

-- Pergunta 7
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Aoi Todo', 1, 7),
('Kento Nanami', 0, 7),
('Panda', 0, 7),
('Yuta Okkotsu', 0, 7);

-- Pergunta 8
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Jogo', 1, 8),
('Mahito', 0, 8),
('Dagon', 0, 8),
('Hanami', 0, 8);

-- Pergunta 9
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Toge Inumaki', 1, 9),
('Yuta Okkotsu', 0, 9),
('Noritoshi Kamo', 0, 9),
('Megumi Fushiguro', 0, 9);

-- Pergunta 10
INSERT INTO resposta (descricao, correta, fk_pergunta) VALUES
('Satoru Gojo', 1, 10),
('Suguru Geto', 0, 10),
('Ryomen Sukuna', 0, 10),
('Kento Nanami', 0, 10);

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
    p.caminho_local AS gif_local,
    p.caminho_url AS gif_url,
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
    u.id,
    u.nome,
    CONCAT(t.pontuacao, '/', (
		SELECT COUNT(*) FROM pergunta
    )) AS pontuacao,
    t.tempo_segundos,
    DATE_FORMAT(t.data_tentativa, '%d/%m') AS data_tentativa
FROM usuario u
JOIN tentativa t 
    ON t.fk_usuario = u.id
WHERE t.id = (
    SELECT t2.id
    FROM tentativa t2
    WHERE t2.fk_usuario = u.id

    ORDER BY 
        t2.pontuacao DESC,
        t2.tempo_segundos ASC
    LIMIT 1
)
ORDER BY 
    t.pontuacao DESC,
    t.tempo_segundos ASC;
