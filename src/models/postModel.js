var database = require('../database/config');

function listarPosts() {
    var instrucaoSql = `
        SELECT id, titulo, conteudo, dt_criacao, fk_usuario
        FROM post;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarPosts
}