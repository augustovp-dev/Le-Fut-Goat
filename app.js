var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var database = require("./src/database/config");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

/* =========================
   DASHBOARD (FUTEBOL)
========================= */
app.post("/dashboard", function(req, res){

    const { ritmo, chute, passe, drible, defesa, fisico } = req.body;

    let posicao = "Volante";

    if (defesa > 75 && fisico > 70) posicao = "Zagueiro";
    else if (passe > 75 && drible > 70) posicao = "Meio-campo";
    else if (chute > 80) posicao = "Atacante";
    else if (ritmo > 80 && drible > 75) posicao = "Ponta";

    let overall = Math.round(
        (ritmo + chute + passe + drible + defesa + fisico) / 6
    );

    res.json({
        posicao,
        overall
    });
});
var usuarioRouter = require("./src/routes/usuarios");
app.use("/usuarios", usuarioRouter); // Define prefixo /usuarios para rotas de usuário

app.listen(PORTA_APP, function () { // Inicia servidor do web-data-viz
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});