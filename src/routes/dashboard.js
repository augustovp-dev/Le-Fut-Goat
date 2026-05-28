var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.post("/cartas", function (req, res) {
    dashboardController.salvarCarta(req, res);
});

router.get("/cartas/:idUsuario", function (req, res) {
    dashboardController.listarCartas(req, res);
});

router.get("/resumo/:idUsuario", function (req, res) {
    dashboardController.buscarResumo(req, res);
});

router.get("/historico/:idUsuario", function (req, res) {
    dashboardController.listarHistorico(req, res);
});

module.exports = router;
