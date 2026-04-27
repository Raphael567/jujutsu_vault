var database = require("../database/config")

function listarPerguntas() {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente");
    var instrucaoSql = `
        SELECT id, descricao, caminho_gif FROM pergunta;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPerguntasRespostas() {
    var instrucaoSql = `
        SELECT 
            p.id AS id_pergunta,
            p.descricao AS pergunta,
            p.caminho_gif AS gif,
            r.id AS id_resposta,
            r.descricao AS resposta,
            r.correta AS correta
        FROM pergunta p
        JOIN resposta r 
            ON r.fk_pergunta = p.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPerguntas,
    listarPerguntasRespostas
};
