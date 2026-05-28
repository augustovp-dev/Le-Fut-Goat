var mysql = require("mysql2");

var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao, parametros) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        return Promise.reject("Ambiente não configurado.");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect(function (erro) {
            if (erro) {
                console.log("❌ Erro ao conectar no banco:", erro.message);
                reject(erro);
                return;
            }

            console.log("✅ Conectado ao banco de dados");

            conexao.query(instrucao, parametros || [], function (erroQuery, resultados) {
                conexao.end();

                if (erroQuery) {
                    console.log("❌ Erro na query:", erroQuery.message);
                    reject(erroQuery);
                    return;
                }

                console.log("✅ Query executada com sucesso");
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};
