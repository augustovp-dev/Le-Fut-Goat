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

    return valor;
}

function gerarDashboard() {
    var kpis = document.getElementById("kpis");
    var barras = document.getElementById("barras");
    var atributos = {
        ritmo: pegarValor("ritmo"),
        chute: pegarValor("chute"),
        passe: pegarValor("passe"),
        drible: pegarValor("drible"),
        defesa: pegarValor("defesa"),
        fisico: pegarValor("fisico")
    };
    var dados = [
        ["Ritmo", atributos.ritmo],
        ["Chute", atributos.chute],
        ["Passe", atributos.passe],
        ["Drible", atributos.drible],
        ["Defesa", atributos.defesa],
        ["Físico", atributos.fisico]
    ];
    var soma = 0;

    kpis.innerHTML = "";
    barras.innerHTML = "<h2>Desempenho por Atributo</h2>";

    for (var i = 0; i < dados.length; i++) {
        var nome = dados[i][0];
        var valor = dados[i][1];
        var classe = cor(valor);

        soma += valor;

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

    var overall = Math.round(soma / dados.length);
    var posicao = descobrirPosicao(atributos);

    kpis.innerHTML += `
        <div class="kpi" style="background:black;">
            <h3>Overall</h3>
            <h1>${overall}</h1>
        </div>
        <div class="kpi" style="background:black;">
            <h3>Posição ideal</h3>
            <h1>${posicao}</h1>
        </div>
    `;

    if (window.grafico) {
        window.grafico.destroy();
    }

    var ctx = document.getElementById("graficoRadar").getContext("2d");

    window.grafico = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Ritmo", "Chute", "Passe", "Drible", "Defesa", "Físico"],
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
                backgroundColor: "rgba(166,77,95,0.4)",
                borderColor: "#a64d5f",
                pointBackgroundColor: "#fff"
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
