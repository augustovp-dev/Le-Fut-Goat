CREATE DATABASE lefutgoat;
USE lefutgoat;

CREATE TABLE usuarios (
    id_usuario    INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100)  NOT NULL,
    email         VARCHAR(100)  NOT NULL UNIQUE,
    senha         VARCHAR(100)  NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cartas (
    id_carta      INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario    INT NOT NULL,
    nome          VARCHAR(100) NOT NULL,
    tipo          VARCHAR(20)  NOT NULL,
    posicao       VARCHAR(10)  NOT NULL,
    modo          VARCHAR(20)  NOT NULL,
    overall       INT NOT NULL,
    ritmo         INT NOT NULL CHECK (ritmo  BETWEEN 0 AND 99),
    chute         INT NOT NULL CHECK (chute  BETWEEN 0 AND 99),
    passe         INT NOT NULL CHECK (passe  BETWEEN 0 AND 99),
    drible        INT NOT NULL CHECK (drible BETWEEN 0 AND 99),
    defesa        INT NOT NULL CHECK (defesa BETWEEN 0 AND 99),
    fisico        INT NOT NULL CHECK (fisico BETWEEN 0 AND 99),
    data_criacao  DATETIME      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE cartagk(
    id_cartagoleiro INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT UNIQUE,
    ranking INT UNIQUE,
    elasticidade INT,
    maneijo INT,
    chute INT,
    reflexos INT,
    posicionamento INT,
    velocidade INT,
    overall INT,
    FOREIGN KEY(fk_usuario)REFERENCES users(id_usuario) 
);

CREATE TABLE historico_overall (
    id_historico  INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario    INT NOT NULL,
    overall       INT NOT NULL,
    posicao       VARCHAR(10) NOT NULL,
    modo          VARCHAR(20) NOT NULL,
    momento       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario)
);

