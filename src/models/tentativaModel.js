var database = require("../database/config")

function listarTentativas() {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente");
    var instrucaoSql = `
        SELECT
            id_usuario,
            nome,
            pontuacao,
            tempo
        FROM tentativas_usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTentativasPorUsuario(idUsuario) {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente");
    var instrucaoSql = `
        SELECT
            data_tentativa,
            pontuacao,
            tempo
        FROM tentativas_usuario 
        WHERE id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRanking() {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente");
    var instrucaoSql = `
        SELECT 
            id,
            nome,
            CONCAT(pontuacao, '/5') AS pontuacao,
            tempo_segundos AS tempo,
            data_tentativa
        FROM ranking
        ORDER BY pontuacao DESC, tempo_segundos ASC;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarTentativa(pontuacao, fk_usuario) {
    var instrucaoSql = `
        INSERT INTO tentativa (pontuacao, data_tentativa, fk_usuario) VALUES (${pontuacao}, NOW(), ${fk_usuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTentativas,
    listarRanking,
    listarTentativasPorUsuario,
    salvarTentativa
};