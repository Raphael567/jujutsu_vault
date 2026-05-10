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
            r.id,
            r.nome,
            CONCAT(r.pontuacao, '/', (
                SELECT COUNT(*) FROM pergunta
            )) AS pontuacao,
            r.tempo_segundos,
            r.data_tentativa
        FROM ranking r
        ORDER BY r.pontuacao DESC, r.tempo_segundos ASC;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarTentativa(pontuacao, tempo_segundos, fk_usuario) {
    var instrucaoSql = `
        INSERT INTO tentativa (pontuacao, tempo_segundos, data_tentativa, fk_usuario) VALUES (${pontuacao}, ${tempo_segundos}, NOW(), ${fk_usuario});
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