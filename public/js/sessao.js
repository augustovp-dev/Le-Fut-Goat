function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var idUsuario = sessionStorage.ID_USUARIO;

    if (!email || !nome || !idUsuario) {
        window.location = "/login.html";
        return;
    }

    var b_usuario = document.getElementById("b_usuario");
    if (b_usuario) {
        b_usuario.innerHTML = nome;
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/login.html";
}

function sair() {
    sessionStorage.clear();
    window.location = "/index.html";
}

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "flex";
    }
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "none";
    }

    if (texto) {
        mostrarMensagem(texto);
    }
}

function mostrarMensagem(texto) {
    var cardErro = document.getElementById("cardErro");
    var mensagemErro = document.getElementById("mensagem_erro");

    if (cardErro && mensagemErro) {
        cardErro.style.display = "block";
        mensagemErro.innerHTML = texto;
    }
}

function sumirMensagem() {
    var cardErro = document.getElementById("cardErro");
    if (cardErro) {
        cardErro.style.display = "none";
    }
}

function atualizarMenu() {
    var nav = document.getElementById("navLinks");
    if (!nav) return;

    var usuarioAutenticado = sessionStorage.ID_USUARIO != null;
    var links = `
        <a href="/index.html">Home</a>
        <a href="/historia.html">Minha Historia</a>
        <a href="/dashboard.html">Dashboard</a>
    `;

    if (usuarioAutenticado) {
        links += `<a href="#" onclick="sair()">Sair</a>`;
    } else {
        links += `
            <a href="/login.html">Login</a>
            <a href="/cadastro.html">Cadastro</a>
        `;
    }

    nav.innerHTML = links;
}

document.addEventListener("DOMContentLoaded", atualizarMenu);
