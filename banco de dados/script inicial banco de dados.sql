CREATE DATABASE lefutgoat;
USE lefutgoat;

CREATE TABLE users (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100),
senha VARCHAR(100)
);

CREATE TABLE cartacomun(
 id_carta INT PRIMARY KEY AUTO_INCREMENT,
 fk_usuario INT,
 ranking INT UNIQUE,
 ritmo INT,
 chute INT,
 passe INT,
 drible INT,
 defesa INT,
 fisico INT,
 overall INT,
 posicao INT,
 foreign key(fk_usuario) REFERENCES users(id_usuario)
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

CREATE TABLE postagem (
id_postagem INT PRIMARY KEY AUTO_INCREMENT,
fk_user INT,
fk_carta INT UNIQUE,
fk_cartagoleiro INT UNIQUE,
FOREIGN KEY(fk_user) REFERENCES users(id_usuario),
FOREIGN KEY(fk_carta) REFERENCES cartacomun(id_carta),
FOREIGN KEY(fk_cartagoleiro) REFERENCES cartagk(id_cartagoleiro)
);


