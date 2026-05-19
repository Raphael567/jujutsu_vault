var database = require('../database/config');

function listarPosts() {
    var instrucaoSql = `
        SELECT 
            id,
            titulo,
            resumo,
            conteudo,
            categoria,
            dt_criacao,
            fk_usuario
        FROM post;
    `;

    return database.executar(instrucaoSql);
}

function buscarPostPorId(idPost) {
    var instrucaoSql = `
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
        WHERE post_id = ${idPost};
    `

    return database.executar(instrucaoSql);
}

module.exports = {
    listarPosts,
    buscarPostPorId
}