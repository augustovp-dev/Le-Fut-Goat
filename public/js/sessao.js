function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        if (b_usuario != null) {
            b_usuario.innerHTML = nome;
        }
        return;
    }

    window.location = "login.html";
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}

function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");

    if (divAguardar != null) {
        divAguardar.style.display = "flex";
    }
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");

    if (divAguardar != null) {
        divAguardar.style.display = "none";
    }

    if (texto) {
        mostrarMensagem(texto);
    }
}

function mostrarMensagem(texto) {
    var cardErro = document.getElementById("cardErro");
    var mensagemErro = document.getElementById("mensagem_erro");

    if (cardErro != null && mensagemErro != null) {
        cardErro.style.display = "block";
        mensagemErro.innerHTML = texto;
    }
}

function sumirMensagem() {
    var cardErro = document.getElementById("cardErro");

    if (cardErro != null) {
        cardErro.style.display = "none";
    }
}

function atualizarMenu() {
    var nav = document.getElementById("navLinks");

    if (nav == null) {
        return;
    }

    var links = `
        <a href="historia.html">Minha<br>Historia<br>no Futebol</a>
        <a href="index.html">Home</a>
        <a href="dashboard.html">Dashboard</a>
    `;

    if (sessionStorage.ID_USUARIO != null) {
        links += `<a href="#" onclick="sair()">Sair</a>`;
    } else {
        links += `
            <a href="login.html">Login</a>
            <a href="cadastro.html">Cadastro</a>
        `;
    }

    nav.innerHTML = links;
}

document.addEventListener("DOMContentLoaded", atualizarMenu);
