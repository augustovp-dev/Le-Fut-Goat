CREATE DATABASE lefutgoat;
USE lefutgoat;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(99) NOT NULL,
    email VARCHAR(99) NOT NULL UNIQUE,
    senha VARCHAR(99) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cartas (
    id_carta INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT NOT NULL,
    nome VARCHAR(99) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    posicao VARCHAR(20) NOT NULL,
    modo VARCHAR(20) NOT NULL,
    overall INT NOT NULL CHECK (overall BETWEEN 0 AND 99),
    ritmo INT NOT NULL CHECK (ritmo BETWEEN 0 AND 99),
    chute INT NOT NULL CHECK (chute BETWEEN 0 AND 99),
    passe INT NOT NULL CHECK (passe BETWEEN 0 AND 99),
    drible INT NOT NULL CHECK (drible BETWEEN 0 AND 99),
    defesa INT NOT NULL CHECK (defesa BETWEEN 0 AND 99),
    fisico INT NOT NULL CHECK (fisico BETWEEN 0 AND 99),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE cartagk (
    id_cartagoleiro INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT NOT NULL UNIQUE,
    ranking INT UNIQUE,
    elasticidade INT CHECK (elasticidade BETWEEN 0 AND 99),
    manejo INT CHECK (manejo BETWEEN 0 AND 99),
    chute INT CHECK (chute BETWEEN 0 AND 99),
    reflexos INT CHECK (reflexos BETWEEN 0 AND 99),
    posicionamento INT CHECK (posicionamento BETWEEN 0 AND 99),
    velocidade INT CHECK (velocidade BETWEEN 0 AND 99),
    overall INT CHECK (overall BETWEEN 0 AND 99),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE historico_overall (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT NOT NULL,
    overall INT NOT NULL CHECK (overall BETWEEN 0 AND 99),
    posicao VARCHAR(20) NOT NULL,
    modo VARCHAR(20) NOT NULL,
    momento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario)
);