var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        res.status(400).send("Informe email e senha.");
        return;
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length !== 1) {
                res.status(403).send("Email ou senha inválidos.");
                return;
            }

            var usuario = resultado[0];
            res.json({
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            });
        })
        .catch(function (erro) {
            console.log("❌ Erro ao autenticar:", erro);
            res.status(500).send("Erro ao realizar login.");
        });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!nome || !email || !senha) {
        res.status(400).send("Preencha todos os campos.");
        return;
    }

    usuarioModel.cadastrar(nome, email, senha)
        .then(function (resultado) {
            res.status(201).json({
                id: resultado.insertId,
                mensagem: "Usuário cadastrado com sucesso."
            });
        })
        .catch(function (erro) {
            console.log("❌ Erro ao cadastrar:", erro);

            if (erro.code === "ER_DUP_ENTRY") {
                res.status(409).send("Email já cadastrado.");
                return;
            }

            res.status(500).send("Erro ao realizar cadastro.");
        });
}

module.exports = {
    autenticar,
    cadastrar
};
