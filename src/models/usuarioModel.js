var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, nome, email FROM usuarios WHERE email = ? AND senha = ?;
    `;

    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);
    `;

    return database.executar(instrucaoSql, [nome, email, senha]);
}

module.exports = {
    autenticar,
    cadastrar
};
