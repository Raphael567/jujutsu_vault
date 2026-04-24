var database = require("../database/config")

function listarRespostasUsuario() {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente");
    var instrucaoSql = `
        SELECT id, fk_tentativa, fk_resposta FROM resposta_usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarRespostasUsuario
};