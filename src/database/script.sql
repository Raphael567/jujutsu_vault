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
    titulo VARCHAR(150) NOT NULL,
    resumo VARCHAR(255),
    conteudo TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    dt_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NOT NULL,

    CONSTRAINT chk_categoria CHECK (
        categoria IN (
            'Feiticeiros',
            'Maldições',
            'Técnicas',
            'Clãs',
            'Arcos',
            'Análises'
        )
    ),

    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE comentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conteudo TEXT NOT NULL,
    dt_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO usuario (nome, email, senha, avatar) VALUES
('Raphael', 'raphael@email.com', '123456', './assets/icon/avatar1.svg'),
('Lucas', 'lucas@email.com', '123456', './assets/icon/avatar3.svg'),
('Ana', 'ana@email.com', '123456', './assets/icon/avatar2.svg'),
('Ricardo', 'ricardo@email.com', '123456', './assets/icon/avatar4.svg'),
('Julia', 'julia@email.com', '123456', './assets/icon/avatar5.svg');

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

INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(3, 80, NOW(), 1);

INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(2, 50, NOW(), 1);

-- Lucas
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(2, 210, NOW(), 2);

-- Ana
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(5, 120, NOW(), 3);

-- Ricardo
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(3, 180, NOW(), 4);

-- Julia
INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES
(4, 95, NOW(), 5);

-- Tentativa 1 (Raphael)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(1, 1),
(1, 5),
(1, 9),
(1, 13),
(1, 18);

-- Tentativa 2 (Raphael)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(2, 1),
(2, 5),
(2, 11),
(2, 14),
(2, 18);

-- Tentativa 3 (Raphael)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(3, 2),
(3, 6),
(3, 10),
(3, 14),
(3, 17);

-- Tentativa 4 (Lucas)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(4, 3),
(4, 7),
(4, 11),
(4, 15),
(4, 19);

-- Tentativa 5 (Ana)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(5, 1),
(5, 5),
(5, 9),
(5, 13),
(5, 17);

-- Tentativa 6 (Ricardo)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(6, 2),
(6, 6),
(6, 10),
(6, 14),
(6, 18);

-- Tentativa 7 (Julia)
INSERT INTO resposta_usuario (fk_tentativa, fk_resposta) VALUES
(7, 1),
(7, 4),
(7, 8),
(7, 12),
(7, 16);

INSERT INTO post (titulo, resumo, conteudo, categoria, fk_usuario) VALUES

(
'Quem é Satoru Gojo?',
'O feiticeiro mais poderoso da era moderna.',
'Satoru Gojo sempre foi apresentado como o ápice absoluto do universo jujutsu. Desde sua introdução, a obra deixa claro que ele está em um nível completamente acima dos demais feiticeiros, sendo tratado como uma força capaz de alterar sozinho o equilíbrio entre humanidade e maldições.

Sua técnica Ilimitada, combinada com os Seis Olhos, oferece uma combinação praticamente perfeita entre defesa, percepção e eficiência energética. Isso faz com que, em teoria, poucos personagens sequer consigam tocá-lo.

Por outro lado, Sukuna representa algo diferente. Ele não é apenas poder bruto, mas também inteligência estratégica, domínio técnico refinado e uma experiência absurda acumulada ao longo dos séculos.

Na minha opinião, se analisarmos apenas força pura e técnicas base, Gojo teria vantagem em vários cenários. Porém, quando se considera a capacidade adaptativa e a crueldade estratégica de Sukuna, o confronto se torna extremamente equilibrado.

O que torna esse embate fascinante é justamente o contraste entre o talento absoluto de Gojo e a experiência monstruosa de Sukuna.',
'Feiticeiros',
1
),

(
'Energia Amaldiçoada',
'Como funciona a base de poder em Jujutsu Kaisen.',
'O sistema de energia amaldiçoada em Jujutsu Kaisen me chama muita atenção pela forma como ele consegue equilibrar criatividade, lógica interna e impacto narrativo.

Diferente de outros sistemas que dependem apenas de aumento bruto de força, aqui existe toda uma construção baseada em emoções negativas, controle refinado e interpretação técnica das habilidades.

A expansão de domínio, por exemplo, é uma das mecânicas mais interessantes já criadas em shounen recentes. Ela transforma batalhas em confrontos de conceito, estratégia e domínio psicológico.

Outro ponto muito forte é como o sistema permite individualidade. Cada feiticeiro possui técnicas únicas que refletem personalidade, história e até filosofia de combate.

Isso torna cada luta imprevisível e muito mais interessante do que apenas medir quem tem mais energia ou mais força física.

Pra mim, esse é um dos sistemas mais bem escritos da nova geração.',
'Técnicas',
2
),

(
'Rei das Maldições',
'A lenda e o terror por trás de Sukuna.',
'Sukuna é tratado como uma figura lendária desde os primeiros capítulos, e quanto mais a obra avança, mais entendemos por que ele recebe esse título.

Não é apenas por força destrutiva. Sua presença impõe terror psicológico até mesmo em feiticeiros experientes, algo que poucos antagonistas conseguem transmitir.

O domínio técnico dele é assustador. Sukuna demonstra controle absoluto sobre energia amaldiçoada, adaptação rápida e capacidade estratégica superior.

Além disso, ele não depende de exageros narrativos para parecer ameaçador. Cada aparição dele reforça sua superioridade de forma natural.

O que mais me impressiona é como ele consegue ser brutal e calculista ao mesmo tempo.

Pra mim, ele não apenas merece o título, como é um dos antagonistas mais bem construídos dos animes modernos.',
'Maldições',
3
),

(
'Jinichi Zenin é Forte?',
'Uma análise sobre o potencial desperdiçado do personagem.',
'Jinichi Zenin é um personagem pouco explorado, mas que gera bastante discussão entre os fãs justamente pelo potencial que aparenta possuir.

Por pertencer à elite do clã Zenin, presume-se que ele tenha passado por treinamento rigoroso e desenvolvido habilidades relevantes.

Mesmo sem grande destaque narrativo, sua postura, influência dentro do clã e presença em momentos importantes sugerem alguém muito acima da média.

Muitos personagens secundários em Jujutsu Kaisen escondem níveis de poder impressionantes, e acredito que Jinichi poderia ter sido melhor explorado.

Talvez, com mais tempo de tela, ele se tornasse uma peça interessante para aprofundar os conflitos internos do clã Zenin.

Na minha visão, ele foi um personagem com potencial desperdiçado.',
'Análises',
4
),

(
'Novo Episódio',
'Os acontecimentos mais recentes e seus impactos.',
'O episódio mais recente trouxe uma sequência absurda de acontecimentos que podem redefinir completamente os rumos da narrativa.

A direção conseguiu construir tensão do começo ao fim, e a animação elevou momentos importantes para outro nível.

Além do impacto visual, o episódio trouxe revelações que mudam nossa percepção sobre certos personagens.

Algumas teorias antigas ganharam força, enquanto outras foram praticamente descartadas.

O mais interessante foi como pequenos detalhes deixados em episódios anteriores finalmente começaram a fazer sentido.

Se a obra continuar nesse ritmo, os próximos acontecimentos têm tudo para entregar um dos arcos mais memoráveis do anime.',
'Arcos',
5
);

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

CREATE VIEW post_usuario AS 
SELECT 
    p.id AS post_id,
    p.titulo AS titulo,
    p.conteudo AS conteudo,
    p.resumo AS resumo,
    p.categoria AS categoria,
    DATE_FORMAT(p.dt_criacao, '%d/%m/%Y') AS data_post,

    u.nome AS autor_post,
    u.avatar AS autor_post_avatar,

    c.id AS comentario_id,
    c.conteudo AS comentario,
    c.dt_criacao AS data_comentario,

    uc.nome AS autor_comentario,
    uc.avatar AS autor_comentario_avatar

FROM post p

JOIN usuario u 
    ON p.fk_usuario = u.id

LEFT JOIN comentario c 
    ON c.fk_post = p.id

LEFT JOIN usuario uc 
    ON c.fk_usuario = uc.id;

SELECT
    post_id,
    titulo,
    conteudo,
    resumo,
    categoria,
    data_post,
    autor_post,
    autor_post_avatar,
    comentario_id,
    comentario,
    data_comentario,
    autor_comentario,
    autor_comentario_avatar
FROM post_usuario
WHERE post_id = 1;