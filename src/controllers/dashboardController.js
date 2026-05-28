var dashboardModel = require("../models/dashboardModel");

function validarIdUsuario(valor) {
    var idUsuario = Number(valor);
    return Number.isInteger(idUsuario) && idUsuario > 0;
}

function numeroAtributo(valor) {
    var numero = Number(valor);

    if (!Number.isFinite(numero) || numero < 0 || numero > 100) {
        return null;
    }

    return Math.round(numero);
}

function texto(valor, padrao) {
    if (typeof valor !== "string" || valor.trim() === "") {
        return padrao;
    }

    return valor.trim();
}

function montarDadosCarta(body) {
    var atributos = {
        ritmo: numeroAtributo(body.ritmoServer),
        chute: numeroAtributo(body.chuteServer),
        passe: numeroAtributo(body.passeServer),
        drible: numeroAtributo(body.dribleServer),
        defesa: numeroAtributo(body.defesaServer),
        fisico: numeroAtributo(body.fisicoServer)
    };

    var nomesAtributos = Object.keys(atributos);

    for (var i = 0; i < nomesAtributos.length; i++) {
        if (atributos[nomesAtributos[i]] === null) {
            return null;
        }
    }

    var overall = numeroAtributo(body.overallServer);

    if (overall === null) {
        overall = Math.round((
            atributos.ritmo +
            atributos.chute +
            atributos.passe +
            atributos.drible +
            atributos.defesa +
            atributos.fisico
        ) / nomesAtributos.length);
    }

    return {
        idUsuario: Number(body.idUsuarioServer),
        nome: texto(body.nomeServer, "Minha carta"),
        tipo: texto(body.tipoServer, "Basica"),
        posicao: texto(body.posicaoServer, "Volante"),
        modo: texto(body.modoServer, "Manual"),
        overall: overall,
        ritmo: atributos.ritmo,
        chute: atributos.chute,
        passe: atributos.passe,
        drible: atributos.drible,
        defesa: atributos.defesa,
        fisico: atributos.fisico
    };
}

function salvarCarta(req, res) {
    if (!validarIdUsuario(req.body.idUsuarioServer)) {
        res.status(400).send("Usuario invalido.");
        return;
    }

    var dados = montarDadosCarta(req.body);

    if (dados === null) {
        res.status(400).send("Informe atributos entre 0 e 100.");
        return;
    }

    dashboardModel.salvarCarta(dados)
        .then(function (resultadoCarta) {
            return dashboardModel.registrarHistorico(dados)
                .then(function () {
                    res.status(201).json({
                        id_carta: resultadoCarta.insertId,
                        mensagem: "Carta salva com sucesso."
                    });
                });
        })
        .catch(function (erro) {
            console.log("❌ Erro ao salvar carta:", erro);
            res.status(500).send("Erro ao salvar carta.");
        });
}

function listarCartas(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!validarIdUsuario(idUsuario)) {
        res.status(400).send("Usuario invalido.");
        return;
    }

    dashboardModel.listarCartas(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("❌ Erro ao listar cartas:", erro);
            res.status(500).send("Erro ao listar cartas.");
        });
}

function buscarResumo(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!validarIdUsuario(idUsuario)) {
        res.status(400).send("Usuario invalido.");
        return;
    }

    Promise.all([
        dashboardModel.buscarResumo(idUsuario),
        dashboardModel.buscarMedias(idUsuario)
    ])
        .then(function (resultados) {
            var resumo = resultados[0][0] || {};
            var medias = resultados[1][0] || {};
            var melhorAtributo = descobrirMelhorAtributo(medias);

            res.json({
                totalCartas: Number(resumo.total_cartas || 0),
                mediaOverall: Number(resumo.media_overall || 0),
                melhorOverall: Number(resumo.melhor_overall || 0),
                melhorAtributo: melhorAtributo,
                medias: medias
            });
        })
        .catch(function (erro) {
            console.log("❌ Erro ao buscar resumo:", erro);
            res.status(500).send("Erro ao buscar resumo.");
        });
}

function listarHistorico(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!validarIdUsuario(idUsuario)) {
        res.status(400).send("Usuario invalido.");
        return;
    }

    dashboardModel.listarHistorico(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("❌ Erro ao listar historico:", erro);
            res.status(500).send("Erro ao listar historico.");
        });
}

function descobrirMelhorAtributo(medias) {
    var atributos = [
        ["Ritmo", Number(medias.media_ritmo || 0)],
        ["Chute", Number(medias.media_chute || 0)],
        ["Passe", Number(medias.media_passe || 0)],
        ["Drible", Number(medias.media_drible || 0)],
        ["Defesa", Number(medias.media_defesa || 0)],
        ["Fisico", Number(medias.media_fisico || 0)]
    ];
    var melhor = atributos[0];

    for (var i = 1; i < atributos.length; i++) {
        if (atributos[i][1] > melhor[1]) {
            melhor = atributos[i];
        }
    }

    return {
        nome: melhor[0],
        valor: melhor[1]
    };
}

module.exports = {
    salvarCarta,
    listarCartas,
    buscarResumo,
    listarHistorico
};
