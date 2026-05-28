CREATE DATABASE IF NOT EXISTS lefutgoat;
USE lefutgoat;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario    INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    senha         VARCHAR(100) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cartas (
    id_carta     INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario   INT NOT NULL,
    nome         VARCHAR(100) NOT NULL,
    tipo         VARCHAR(20) NOT NULL,
    posicao      VARCHAR(20) NOT NULL,
    modo         VARCHAR(20) NOT NULL,
    overall      INT NOT NULL CHECK (overall BETWEEN 0 AND 100),
    ritmo        INT NOT NULL CHECK (ritmo BETWEEN 0 AND 100),
    chute        INT NOT NULL CHECK (chute BETWEEN 0 AND 100),
    passe        INT NOT NULL CHECK (passe BETWEEN 0 AND 100),
    drible       INT NOT NULL CHECK (drible BETWEEN 0 AND 100),
    defesa       INT NOT NULL CHECK (defesa BETWEEN 0 AND 100),
    fisico       INT NOT NULL CHECK (fisico BETWEEN 0 AND 100),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cartagk (
    id_cartagoleiro INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario      INT NOT NULL UNIQUE,
    ranking         INT UNIQUE,
    elasticidade    INT CHECK (elasticidade BETWEEN 0 AND 100),
    manejo          INT CHECK (manejo BETWEEN 0 AND 100),
    chute           INT CHECK (chute BETWEEN 0 AND 100),
    reflexos        INT CHECK (reflexos BETWEEN 0 AND 100),
    posicionamento  INT CHECK (posicionamento BETWEEN 0 AND 100),
    velocidade      INT CHECK (velocidade BETWEEN 0 AND 100),
    overall         INT CHECK (overall BETWEEN 0 AND 100),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS historico_overall (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario   INT NOT NULL,
    overall      INT NOT NULL CHECK (overall BETWEEN 0 AND 100),
    posicao      VARCHAR(20) NOT NULL,
    modo         VARCHAR(20) NOT NULL,
    momento      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);
