CREATE DATABASE gestao_produtos_contabilidade;

USE gestao_produtos_contabilidade;

CREATE TABLE status_prod (
	id_status int AUTO_INCREMENT,
	desc_status varchar(30) NOT NULL,
	PRIMARY KEY (id_status)
);

CREATE TABLE nivel_acessos (
	id_nivel_acesso int AUTO_INCREMENT,
	nome_acesso varchar(30) NOT NULL,
	PRIMARY KEY (id_nivel_acesso)
);

CREATE TABLE setor (
	id_setor int AUTO_INCREMENT,
	nome_setor varchar(30) NOT NULL,
	PRIMARY KEY (id_setor)
);

CREATE TABLE produtos (
	id_produto int AUTO_INCREMENT,
	nome_produto varchar(50) NOT NULL,
	valor_produto double NOT NULL,
	cod_aux int NOT NULL,
	PRIMARY KEY(id_produto)
);
	
CREATE TABLE estoque (
	id_produto_estoque int,
	qtd_produto_estoque int,
	FOREIGN KEY (id_produto_estoque) references produtos(id_produto)
);
	
CREATE TABLE movimentacao(
	id_movimentacao int AUTO_INCREMENT,
	id_produto_movimentacao int NOT NULL,
	movimentacao_produto boolean NOT NULL,
	data_movimentacao_produto DATETIME NOT NULL,
	qtd_movimentacao_produto int NULL,
	PRIMARY KEY (id_movimentacao),
	FOREIGN KEY (id_produto_movimentacao) references produtos(id_produto)
);

CREATE TABLE usuarios (
	id_usuario int AUTO_INCREMENT,
	login_usuario varchar(50) NOT NULL,
	nome_usuario varchar(50) NOT NULL,
	senha_usuario varchar(50) NOT NULL,
    setor_usuario int NOT NULL,
	nivel_acesso_usuario int NOT NULL,
	PRIMARY KEY (id_usuario),
	FOREIGN KEY (nivel_acesso_usuario) references nivel_acessos(id_nivel_acesso),
    FOREIGN KEY (setor_usuario) references setor(id_setor)
);

CREATE TABLE requisicoes (
	id_requisicao int AUTO_INCREMENT,
	id_usuario_requisicao int NOT NULL,
	id_produto_requisicao int NOT NULL,
	qtd_produto int NOT NULL,
	status_produto int NOT NULL,
	desc_func varchar(200),
	desc_admin varchar(200),
	PRIMARY KEY (id_requisicao),
	FOREIGN KEY (id_usuario_requisicao) references usuarios(id_usuario),
	FOREIGN KEY (id_produto_requisicao) references produtos(id_produto),
	FOREIGN KEY (status_produto) references status_prod(id_status)
);

CREATE TABLE fornecedor_itens (
	id_item int AUTO_INCREMENT,
	registro int NOT NULL,
	descricao varchar(200) NOT NULL,
	qtde int NOT NULL,
	valor varchar(50) NOT NULL,
	aux int NOT NULL,
	PRIMARY KEY (id_item)
);

INSERT INTO status_prod (desc_status) VALUES 
	("Pendente"),
	("Aprovado"),
	("Reprovado");

INSERT INTO nivel_acessos (nome_acesso) VALUES 
	("Administrador"),
	("Funcionario");
    
INSERT INTO setor (nome_setor) VALUES 
	("Almoxarifado"),
	("Marketing"),
    ("Expedição"),
    ("Financeiro"),
    ("Administrativo"),
    ("Compras"),
    ("Galpão 1"),
    ("Galpão 2"),
    ("Galpão 3");

INSERT INTO produtos (nome_produto, valor_produto) VALUES 
	("Caneta Azul", 2.35),
	("Caneta Verde", 3.5),
	("Penal Power Rangers", 15.25),
	("Mochila Marvel Hulk", 100.50);

INSERT INTO estoque (id_produto_estoque, qtd_produto_estoque) VALUES
	(1, 30),
	(2, 40),
	(3, 15),
	(4, 7);

INSERT INTO usuarios (login_usuario, nome_usuario, senha_usuario, setor_usuario, nivel_acesso_usuario) VALUES 
	("wesley@gmail.com", "Wesley Sardi", "123", 2, 1),
	("victor@gmail.com", "Victor Kuhn", "234", 4, 1),
	("davi@gmail.com", "Davi Prudente", "345", 7, 1),
	("marcos@gmail.com", "Marcos Gonçalves", "456", 6, 1),
    ("mateus@gmail.com", "Mateus Smith", "456", 8, 1),
    ("julioc@gmail.com", "Julião Costa", "1018", 9, 1),
    ("jailsonm@gmail.com", "Jailson Mello", "7894", 8, 1),
    ("jeffersonp@gmail.com", "Jefferson Pessoa", "182479", 9, 1),
    ("arthurv@gmail.com", "Arthur Velloso", "777846", 7, 1),
    ("hugoc@gmail.com", "Hugo Calcanha", "23488", 5, 1);
	
INSERT INTO movimentacao (id_produto_movimentacao, movimentacao_produto, data_movimentacao_produto, qtd_movimentacao_produto) VALUES
	(1, false, "2019-12-15 03:09:12", 9),
	(2, true, "2017-08-12 04:10:11", 12),
	(3, false, "2014-05-11 05:11:14", 7),
	(4, true, "2012-09-04 06:12:17", 3);
    
ALTER TABLE movimentacao
DROP FOREIGN KEY movimentacao_ibfk_1;

ALTER TABLE movimentacao
ADD CONSTRAINT movimentacao_ibfk_1
FOREIGN KEY (id_produto_movimentacao)
REFERENCES produtos(id_produto)
ON DELETE CASCADE;

INSERT INTO produtos (nome_produto, valor_produto) VALUES 
    ('O Guia do Mochileiro das Galáxias', 29.99),
    ('Harry Potter e a Pedra Filosofal', 39.99),
    ('Cem Anos de Solidão', 25.50),
    ('1984', 19.99),
    ('O Senhor dos Anéis: A Sociedade do Anel', 34.99),
    ('Dom Quixote', 22.75),
    ('A Culpa é das Estrelas', 18.50),
    ('O Pequeno Príncipe', 15.99),
    ('A Arte da Guerra', 27.25),
    ('A Revolução dos Bichos', 21.99),
    ('Código Da Vinci', 32.50),
    ('A Menina que Roubava Livros', 23.75),
    ('O Hobbit', 26.99),
    ('Crime e Castigo', 29.50),
    ('Fahrenheit 451', 17.99),
    ('A Metamorfose', 20.25),
    ('O Alquimista', 24.99),
    ('A Ilíada', 28.50),
    ('A Odisséia', 31.75),
    ('O Retrato de Dorian Gray', 33.99);

INSERT INTO estoque (id_produto_estoque, qtd_produto_estoque) VALUES
    (5, 30),
    (6, 45),
    (7, 20),
    (8, 10),
    (9, 25),
    (10, 40),
    (11, 15),
    (12, 35),
    (13, 50),
    (14, 12),
    (15, 28),
    (16, 18),
    (17, 32),
    (18, 22),
    (19, 48),
    (20, 38),
    (21, 11),
    (22, 42),
    (23, 17),
    (24, 26);

INSERT INTO requisicoes (id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto) VALUES 
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1),
	(1, 1, 5, 1);
