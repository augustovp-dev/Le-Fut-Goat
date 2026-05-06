function cor(valor){
    if(valor >= 70){
        return "verde";
    } else if(valor >= 50){
        return "amarelo";
    } else {
        return "vermelho";
    }
}

function descobrirPosicao(dados) {

    let ritmo = dados.ritmo;
    let chute = dados.chute;
    let passe = dados.passe;
    let drible = dados.drible;
    let defesa = dados.defesa;
    let fisico = dados.fisico;

    if (defesa > 75 && fisico > 70) return "Zagueiro";
    if (passe > 75 && drible > 70) return "Meio-campo";
    if (chute > 80) return "Atacante";
    if (ritmo > 80 && drible > 75) return "Ponta";

    return "Volante";
}

function gerarDashboard(){

    let kpis = document.getElementById("kpis");
    let barras = document.getElementById("barras");

    // limpa antes de gerar
    kpis.innerHTML = "";
    barras.innerHTML = "<h2>Desempenho por Atributo</h2>";

    let dados = [
        ["Ritmo", ritmo.value],
        ["Chute", chute.value],
        ["Passe", passe.value],
        ["Drible", drible.value],
        ["Defesa", defesa.value],
        ["Físico", fisico.value]
    ];

    let resumo = {};

    // LOOP (apenas KPIs e barras)
    for (let i = 0; i < dados.length; i++) {

        let nome = dados[i][0];
        let valor = Number(dados[i][1]);

        if (isNaN(valor) || valor < 0) continue;

        let classe = cor(valor);

        resumo[nome.toLowerCase()] = valor;

        // KPI
        kpis.innerHTML += `
        <div class="kpi ${classe}">
            <h3>${nome}</h3>
            <h1>${valor}</h1>
        </div>
        `;

        // Barra
        barras.innerHTML += `
        <div class="barra ${classe}" style="width:${valor}%;">
            ${nome} - ${valor}
        </div>
        `;
    }

    // OVERALL (estilo FIFA)
    let overall = Math.round(
        (
            (resumo.ritmo || 0) +
            (resumo.chute || 0) +
            (resumo.passe || 0) +
            (resumo.drible || 0) +
            (resumo.defesa || 0) +
            (resumo["físico"] || 0)
        ) / 6
    );

    kpis.innerHTML += `
    <div class="kpi" style="background:black;">
        <h3>Overall</h3>
        <h1>${overall}</h1>
    </div>
    `;

    // POSIÇÃO
    let posicao = descobrirPosicao({
        ritmo: resumo.ritmo || 0,
        chute: resumo.chute || 0,
        passe: resumo.passe || 0,
        drible: resumo.drible || 0,
        defesa: resumo.defesa || 0,
        fisico: resumo["físico"] || 0
    });

    kpis.innerHTML += `
    <div class="kpi" style="background:black;">
        <h3>Posição ideal</h3>
        <h1>${posicao}</h1>
    </div>
    `;

    // FETCH (fora do loop)
    fetch("/dashboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ritmo: resumo.ritmo || 0,
            chute: resumo.chute || 0,
            passe: resumo.passe || 0,
            drible: resumo.drible || 0,
            defesa: resumo.defesa || 0,
            fisico: resumo["físico"] || 0
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Backend:", data);
    });

    // GRÁFICO RADAR (fixo estilo FIFA)
    if (window.grafico) {
        window.grafico.destroy();
    }

    const ctx = document.getElementById("graficoRadar").getContext("2d");

    window.grafico = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Ritmo", "Chute", "Passe", "Drible", "Defesa", "Físico"],
            datasets: [{
                label: "Atributos do Jogador",
                data: [
                    resumo.ritmo || 0,
                    resumo.chute || 0,
                    resumo.passe || 0,
                    resumo.drible || 0,
                    resumo.defesa || 0,
                    resumo["físico"] || 0
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