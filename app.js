var ambiente_processo = process.env.AMBIENTE_PROCESSO || process.env.NODE_ENV || "desenvolvimento";
var caminho_env = ambiente_processo === "producao" || ambiente_processo === "production" ? ".env" : ".env.dev";

require("dotenv").config({ path: caminho_env });

if (process.env.AMBIENTE_PROCESSO === "production") {
    process.env.AMBIENTE_PROCESSO = "producao";
}

if (ambiente_processo === "production") {
    ambiente_processo = "producao";
}

process.env.AMBIENTE_PROCESSO = process.env.AMBIENTE_PROCESSO || ambiente_processo;

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT || 3333;
var HOST_APP = process.env.APP_HOST || "localhost";

var app = express();
var usuarioRouter = require("./src/routes/usuarios");
var dashboardRouter = require("./src/routes/dashboard");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/usuarios", usuarioRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORTA_APP, function () {
    console.log(`Servidor rodando em http://${HOST_APP}:${PORTA_APP}`);
});
