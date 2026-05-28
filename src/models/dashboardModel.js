var database = require("../database/config");

function salvarCarta(dados) {
    var instrucaoSql = `
        INSERT INTO cartas
            (fk_usuario, nome, tipo, posicao, modo, overall, ritmo, chute, passe, drible, defesa, fisico)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [
        dados.idUsuario,
        dados.nome,
        dados.tipo,
        dados.posicao,
        dados.modo,
        dados.overall,
        dados.ritmo,
        dados.chute,
        dados.passe,
        dados.drible,
        dados.defesa,
        dados.fisico
    ]);
}

function registrarHistorico(dados) {
    var instrucaoSql = `
        INSERT INTO historico_overall (fk_usuario, overall, posicao, modo)
        VALUES (?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [
        dados.idUsuario,
        dados.overall,
        dados.posicao,
        dados.modo
    ]);
}

function listarCartas(idUsuario) {
    var instrucaoSql = `
        SELECT
            id_carta,
            nome,
            tipo,
            posicao,
            modo,
            overall,
            ritmo,
            chute,
            passe,
            drible,
            defesa,
            fisico,
            DATE_FORMAT(data_criacao, '%d/%m/%Y %H:%i') AS data_criacao
        FROM cartas
        WHERE fk_usuario = ?
        ORDER BY data_criacao DESC, id_carta DESC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql, [idUsuario]);
}

function buscarResumo(idUsuario) {
    var instrucaoSql = `
        SELECT
            COUNT(*) AS total_cartas,
            COALESCE(ROUND(AVG(overall)), 0) AS media_overall,
            COALESCE(MAX(overall), 0) AS melhor_overall
        FROM cartas
        WHERE fk_usuario = ?;
    `;

    return database.executar(instrucaoSql, [idUsuario]);
}

function buscarMedias(idUsuario) {
    var instrucaoSql = `
        SELECT
            COALESCE(ROUND(AVG(ritmo)), 0) AS media_ritmo,
            COALESCE(ROUND(AVG(chute)), 0) AS media_chute,
            COALESCE(ROUND(AVG(passe)), 0) AS media_passe,
            COALESCE(ROUND(AVG(drible)), 0) AS media_drible,
            COALESCE(ROUND(AVG(defesa)), 0) AS media_defesa,
            COALESCE(ROUND(AVG(fisico)), 0) AS media_fisico
        FROM cartas
        WHERE fk_usuario = ?;
    `;

    return database.executar(instrucaoSql, [idUsuario]);
}

function listarHistorico(idUsuario) {
    var instrucaoSql = `
        SELECT
            overall,
            posicao,
            modo,
            momento
        FROM (
            SELECT
                overall,
                posicao,
                modo,
                DATE_FORMAT(momento, '%d/%m %H:%i') AS momento,
                id_historico
            FROM historico_overall
            WHERE fk_usuario = ?
            ORDER BY id_historico DESC
            LIMIT 10
        ) AS ultimos
        ORDER BY id_historico ASC;
    `;

    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    salvarCarta,
    registrarHistorico,
    listarCartas,
    buscarResumo,
    buscarMedias,
    listarHistorico
};
