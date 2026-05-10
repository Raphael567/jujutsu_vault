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
        WHERE id_usuario = ${idUsuario}
        ORDER BY data_tentativa DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRanking() {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente");
    var instrucaoSql = `
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