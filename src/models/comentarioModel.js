var database = require('../database/config');

function listarComentarios() {
    var instrucaoSql = `
        SELECT id, conteudo, dt_criacao, fk_post, fk_usuario
        FROM comentario;
    `;

    return database.executar(instrucaoSql);
}

function comentar(conteudo, fkPost, fkUsuario) {
    var instrucaoSql = `
        INSERT INTO comentario (conteudo, fk_post, fk_usuario)
        VALUES ('${conteudo}', ${fkPost}, ${fkUsuario});
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarComentarios,
    comentar
}