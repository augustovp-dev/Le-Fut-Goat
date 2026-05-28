function cor(valor) {
    if (valor >= 70) {
        return "verde";
    }

    if (valor >= 50) {
        return "amarelo";
    }

    return "vermelho";
}

function descobrirPosicao(dados) {
    if (dados.defesa > 75 && dados.fisico > 70) {
        return "Zagueiro";
    }

    if (dados.passe > 75 && dados.drible > 70) {
        return "Meio-campo";
    }

    if (dados.chute > 80) {
        return "Atacante";
    }

    if (dados.ritmo > 80 && dados.drible > 75) {
        return "Ponta";
    }

    if (dados.ritmo > 80 && dados.defesa > 75) {
        return "Lateral";
    }

    return "Volante";
}

function pegarValor(id) {
    var valor = Number(document.getElementById(id).value);

    if (isNaN(valor) || valor < 0) {
        return 0;
    }

    if (valor > 100) {
        return 100;
    }

    return Math.round(valor);
}

function pegarAtributos() {
    return {
        ritmo: pegarValor("ritmo"),
        chute: pegarValor("chute"),
        passe: pegarValor("passe"),
        drible: pegarValor("drible"),
        defesa: pegarValor("defesa"),
        fisico: pegarValor("fisico")
    };
}

function calcularOverall(atributos) {
    return Math.round((
        atributos.ritmo +
        atributos.chute +
        atributos.passe +
        atributos.drible +
        atributos.defesa +
        atributos.fisico
    ) / 6);
}

function montarListaAtributos(atributos) {
    return [
        ["Ritmo", atributos.ritmo],
        ["Chute", atributos.chute],
        ["Passe", atributos.passe],
        ["Drible", atributos.drible],
        ["Defesa", atributos.defesa],
        ["Fisico", atributos.fisico]
    ];
}

function gerarDashboard() {
    var atributos = pegarAtributos();
    var overall = calcularOverall(atributos);
    var posicao = descobrirPosicao(atributos);

    renderizarDashboard(atributos, overall, posicao);

    if (sessionStorage.ID_USUARIO == null) {
        exibirStatus("Entre na conta para salvar sua carta no banco.");
        return false;
    }

    salvarCarta(atributos, overall, posicao);
    return false;
}

function renderizarDashboard(atributos, overall, posicao) {
    var kpis = document.getElementById("kpis");
    var barras = document.getElementById("barras");
    var dados = montarListaAtributos(atributos);

    kpis.innerHTML = "";
    barras.innerHTML = "<h2>Desempenho por Atributo</h2>";

    for (var i = 0; i < dados.length; i++) {
        var nome = dados[i][0];
        var valor = dados[i][1];
        var classe = cor(valor);

        kpis.innerHTML += `
            <div class="kpi ${classe}">
                <h3>${nome}</h3>
                <h1>${valor}</h1>
            </div>
        `;

        barras.innerHTML += `
            <div class="barra ${classe}" style="width:${valor}%;">
                ${nome} - ${valor}
            </div>
        `;
    }

    kpis.innerHTML += `
        <div class="kpi neutra">
            <h3>Overall</h3>
            <h1>${overall}</h1>
        </div>
        <div class="kpi neutra">
            <h3>Posicao ideal</h3>
            <h1>${posicao}</h1>
        </div>
    `;

    renderizarRadar(atributos);
}

function renderizarRadar(atributos) {
    if (typeof Chart === "undefined") {
        return;
    }

    if (window.grafico) {
        window.grafico.destroy();
    }

    var ctx = document.getElementById("graficoRadar").getContext("2d");

    window.grafico = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Ritmo", "Chute", "Passe", "Drible", "Defesa", "Fisico"],
            datasets: [{
                label: "Atributos do Jogador",
                data: [
                    atributos.ritmo,
                    atributos.chute,
                    atributos.passe,
                    atributos.drible,
                    atributos.defesa,
                    atributos.fisico
                ],
                backgroundColor: "rgba(235,13,63,0.25)",
                borderColor: "#EB0D3F",
                pointBackgroundColor: "#111111"
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function salvarCarta(atributos, overall, posicao) {
    fetch("/dashboard/cartas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            nomeServer: pegarNomeCarta(),
            tipoServer: "Basica",
            posicaoServer: posicao,
            modoServer: "Manual",
            overallServer: overall,
            ritmoServer: atributos.ritmo,
            chuteServer: atributos.chute,
            passeServer: atributos.passe,
            dribleServer: atributos.drible,
            defesaServer: atributos.defesa,
            fisicoServer: atributos.fisico
        })
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                return resposta.text().then(function (texto) {
                    throw new Error(texto);
                });
            }

            return resposta.json();
        })
        .then(function () {
            exibirStatus("Carta salva no banco.");
            carregarDadosUsuario();
        })
        .catch(function (erro) {
            exibirStatus(erro.message || "Nao foi possivel salvar a carta.");
        });
}

function pegarNomeCarta() {
    var input = document.getElementById("nomeCarta");
    var nomeCarta = input != null ? input.value.trim() : "";

    if (nomeCarta !== "") {
        return nomeCarta;
    }

    if (sessionStorage.NOME_USUARIO) {
        return "Carta de " + sessionStorage.NOME_USUARIO;
    }

    return "Minha carta";
}

function carregarDadosUsuario() {
    var idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == null) {
        renderizarResumo({
            totalCartas: 0,
            mediaOverall: 0,
            melhorOverall: 0,
            melhorAtributo: { nome: "-", valor: 0 }
        });
        renderizarCartas([]);
        renderizarHistorico([]);
        return;
    }

    Promise.all([
        buscarJson("/dashboard/cartas/" + idUsuario),
        buscarJson("/dashboard/resumo/" + idUsuario),
        buscarJson("/dashboard/historico/" + idUsuario)
    ])
        .then(function (resultados) {
            renderizarCartas(resultados[0]);
            renderizarResumo(resultados[1]);
            renderizarHistorico(resultados[2]);
        })
        .catch(function () {
            exibirStatus("Nao foi possivel carregar os dados salvos.");
        });
}

function buscarJson(url) {
    return fetch(url).then(function (resposta) {
        if (!resposta.ok) {
            return resposta.text().then(function (texto) {
                throw new Error(texto);
            });
        }

        return resposta.json();
    });
}

function renderizarResumo(resumo) {
    var container = document.getElementById("resumoDashboard");

    if (container == null) {
        return;
    }

    container.innerHTML = `
        <div class="resumo-item">
            <strong>Cartas</strong><br>${resumo.totalCartas}
        </div>
        <div class="resumo-item">
            <strong>Media overall</strong><br>${resumo.mediaOverall}
        </div>
        <div class="resumo-item">
            <strong>Melhor overall</strong><br>${resumo.melhorOverall}
        </div>
        <div class="resumo-item">
            <strong>Melhor atributo</strong><br>${escapeHtml(resumo.melhorAtributo.nome)} (${resumo.melhorAtributo.valor})
        </div>
    `;
}

function renderizarCartas(cartas) {
    var lista = document.getElementById("listaCartas");

    if (lista == null) {
        return;
    }

    if (!Array.isArray(cartas) || cartas.length === 0) {
        lista.innerHTML = `<div class="carta-item">Nenhuma carta salva ainda.</div>`;
        return;
    }

    lista.innerHTML = "";

    for (var i = 0; i < cartas.length; i++) {
        var carta = cartas[i];

        lista.innerHTML += `
            <div class="carta-item">
                <strong>${escapeHtml(carta.nome)}</strong> - ${escapeHtml(carta.posicao)}
                <br>Overall: ${carta.overall}
                <br>${escapeHtml(carta.data_criacao || "")}
            </div>
        `;
    }
}

function renderizarHistorico(historico) {
    if (typeof Chart === "undefined") {
        return;
    }

    if (window.graficoHistorico) {
        window.graficoHistorico.destroy();
    }

    var ctx = document.getElementById("graficoHistorico").getContext("2d");

    window.graficoHistorico = new Chart(ctx, {
        type: "line",
        data: {
            labels: historico.map(function (item) {
                return item.momento;
            }),
            datasets: [{
                label: "Overall",
                data: historico.map(function (item) {
                    return item.overall;
                }),
                borderColor: "#EB0D3F",
                backgroundColor: "rgba(235,13,63,0.15)",
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function exibirStatus(texto) {
    var cardErro = document.getElementById("cardErro");
    var mensagemErro = document.getElementById("mensagem_erro");

    if (cardErro == null || mensagemErro == null) {
        return;
    }

    cardErro.style.display = "block";
    mensagemErro.innerHTML = escapeHtml(texto);
}

function escapeHtml(valor) {
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", carregarDadosUsuario);
