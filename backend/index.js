const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

const port = 5000;

// Conexão com banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'gestao_produtos_contabilidade',
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

///////////////////////////////////////////////////////////////////////////

//                   OPERAÇÕES RELACIONADAS A PRODUTOS                   //

///////////////////////////////////////////////////////////////////////////

// Pegar os dados de um produto pelo ID
app.get('/api/getProduto/:id', (req, res) => {
    const id_produto = req.params.id;
    const query = 'SELECT * FROM produtos WHERE id_produto = ?';

    db.query(query, [id_produto], (err, result) => {
        if (err) {
            console.error('Erro ao obter o produto:', err);
            res.status(500).json({ error: 'Erro ao obter o produto.' });
        } else {
            if (result.length > 0) {
                const produto = result[0];
                res.status(200).json(produto);
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        }
    });
});

// Pegar os dados de um produto pelo ID com o estoque junto
app.get('/api/getProdutoEstoque/:id', (req, res) => {
    const id_produto = req.params.id;
    const query = 'SELECT p.id_produto, p.nome_produto, e.qtd_produto_estoque FROM produtos p INNER JOIN estoque e ON id_produto_estoque = id_produto WHERE id_produto = ?';

    db.query(query, [id_produto], (err, result) => {
        if (err) {
            console.error('Erro ao obter o produto:', err);
            res.status(500).json({ error: 'Erro ao obter o produto.' });
        } else {
            if (result.length > 0) {
                const produto = result[0];
                res.status(200).json(produto);
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        }
    });
});

// Pegar os produtos jutamente também com o estoque
app.get('/api/getProdutosComEstoque', (req, res) => {
    const query = 'SELECT p.id_produto, p.nome_produto, p.valor_produto, e.qtd_produto_estoque FROM produtos AS p INNER JOIN estoque AS e ON p.id_produto = e.id_produto_estoque';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter os produtos com estoque:', err);
            res.status(500).json({ error: 'Erro ao obter os produtos com estoque.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Pegar os produtos jutamente também com o estoque e as movimentacoes
app.get('/api/getProdutosComEstoqueEMovimentacao', (req, res) => {
    const query = 'SELECT p.id_produto, m.movimentacao_produto, p.valor_produto, e.qtd_produto_estoque FROM produtos p INNER JOIN estoque e ON p.id_produto = e.id_produto_estoque INNER JOIN movimentacao m ON p.id_produto = m.id_produto_movimentacao';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter os produtos com estoque e as movimentacoes:', err);
            res.status(500).json({ error: 'Erro ao obter os produtos com estoque e as movimentacoes.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Pegar as requisições
app.get('/api/getRequisicoes/:id', (req, res) => {
    const id_requisicao = req.params.id;
    const query = 'SELECT r.id_requisicao, u.nome_usuario, p.nome_produto, r.qtd_produto, r.desc_func, s.desc_status FROM requisicoes r INNER JOIN usuarios u ON r.id_usuario_requisicao = u.id_usuario INNER JOIN produtos p ON r.id_produto_requisicao = p.id_produto INNER JOIN status_prod s ON r.status_produto = s.id_status WHERE id_requisicao = ?';
    const values = [id_requisicao];

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter as requisicoes:', err);
            res.status(500).json({ error: 'Erro ao obter as requisicoes.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Pegar as requisições onde o status for 1 -> "Pendente"
app.get('/api/getRequisicoesPendente', (req, res) => {
    const query = 'SELECT r.id_requisicao, u.nome_usuario, p.nome_produto, r.qtd_produto, r.desc_func, s.desc_status FROM requisicoes r INNER JOIN usuarios u ON r.id_usuario_requisicao = u.id_usuario INNER JOIN produtos p ON r.id_produto_requisicao = p.id_produto INNER JOIN status_prod s ON r.status_produto = s.id_status WHERE desc_status = "Pendente" ORDER BY r.id_requisicao';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter as movimentacoes:', err);
            res.status(500).json({ error: 'Erro ao obter as movimentacoes.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Pegar as movimentacoes
app.get('/api/getMovimentacoes', (req, res) => {
    const query = 'SELECT m.id_movimentacao, p.nome_produto, m.qtd_movimentacao_produto, m.data_movimentacao_produto, m.movimentacao_produto, CASE WHEN m.movimentacao_produto = 1 THEN "Entrada" WHEN m.movimentacao_produto = 0 THEN "Saída" ELSE "ERRO" END as movimento FROM movimentacao m INNER JOIN produtos p ON m.id_produto_movimentacao = p.id_produto ORDER BY m.data_movimentacao_produto DESC';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter as movimentacoes:', err);
            res.status(500).json({ error: 'Erro ao obter as movimentacoes.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Alterar as requisicoes para recusadas
app.put('/api/updateRequisicoesParaRecusadas/:id', (req, res) => {
    const id_requisicao = req.params.id;
    const { desc_admin } = req.body;
    const query = 'UPDATE requisicoes SET status_produto = 3, desc_admin = ? WHERE id_requisicao = ?';
    const values = [desc_admin, id_requisicao];

    // const id_produto = req.params.id;
    // const { nome_produto, valor_produto } = req.body;
    // const query = 'UPDATE produtos SET nome_produto = ?, valor_produto = ? WHERE id_produto = ?';
    // const values = [nome_produto, valor_produto, id_produto];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao alterar a requisicao para Recusada:', err);
            res.status(500).json({ error: 'Erro ao alterar a requisicao para Recusada.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Requisicao alterada para Recusada com sucesso.' });
            } else {
                res.status(404).json({ error: 'Requisicao não encontrado.' });
            }
        }
    });
});

// Alterar as requisicoes para recusadas
app.put('/api/updateRequisicoesParaAprovadas/:id', (req, res) => {
    const id_requisicao = req.params.id;
    const query = 'UPDATE requisicoes SET status_produto = 2 WHERE id_requisicao = ?';
    const values = [id_requisicao];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao alterar a requisicao para Aprovada:', err);
            res.status(500).json({ error: 'Erro ao alterar a requisicao para Recusada.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Requisicao alterada para Recusada com sucesso.' });
            } else {
                res.status(404).json({ error: 'Requisicao não encontrado.' });
            }
        }
    });
});

// Pegar as requisicoes recusadas
app.get('/api/getRequisicoesRecusadas', (req, res) => {
    const query = 'SELECT r.id_requisicao, u.nome_usuario, p.nome_produto, r.qtd_produto, s.desc_status FROM requisicoes r INNER JOIN usuarios u ON r.id_usuario_requisicao = u.id_usuario INNER JOIN produtos p ON r.id_produto_requisicao = p.id_produto INNER JOIN status_prod s ON r.status_produto = s.id_status WHERE desc_status = "Reprovado"';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter as Requisicoes Recusadas:', err);
            res.status(500).json({ error: 'Erro ao obter as Requisicoes Recusadas.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Cadastro de um produto
app.post('/api/cadastrarProduto', (req, res) => {
    const { nome_produto, valor_produto, qtd_produto_estoque } = req.body;
    const query = 'INSERT INTO produtos (nome_produto, valor_produto) VALUES (?, ?)';
    const values = [nome_produto, valor_produto];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar o produto:', err);
            res.status(500).json({ error: 'Erro ao cadastrar o produto.' });
        } else {
            const id_produto = result.insertId;
            const estoqueQuery = 'INSERT INTO estoque (id_produto_estoque, qtd_produto_estoque) VALUES (?, ?)';
            const estoqueValues = [id_produto, qtd_produto_estoque];

            db.query(estoqueQuery, estoqueValues, (err) => {
                if (err) {
                    console.error('Erro ao cadastrar o estoque:', err);
                    res.status(500).json({ error: 'Erro ao cadastrar o estoque.' });
                } else {
                    res.status(200).json({ message: 'Produto cadastrado com sucesso.' });
                }
            });
        }
    });
});

// Cadastro de uma requisição
app.post('/api/cadastrarRequisicao', (req, res) => {
    const { id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto, desc_func } = req.body;
    const query = 'INSERT INTO requisicoes (id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto, desc_func) VALUES (?, ?, ?, ?, ?)';
    const values = [id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto, desc_func];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar a requisicao:', err);
            res.status(500).json({ error: 'Erro ao cadastrar a requisicao.' });
        } else {
            res.status(200).json({ message: 'Requisicao cadastrada com sucesso.' });
        }
    });
});

// Edição de um produto
app.put('/api/editarProduto/:id', (req, res) => {
    const id_produto = req.params.id;
    const { nome_produto, valor_produto } = req.body;
    const query = 'UPDATE produtos SET nome_produto = ?, valor_produto = ? WHERE id_produto = ?';
    const values = [nome_produto, valor_produto, id_produto];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao editar o produto:', err);
            res.status(500).json({ error: 'Erro ao editar o produto.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Produto atualizado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        }
    });
});

// Exclusão de um produto (Está sendo feito com cascade, por termos que realizar uma exclusão em cascata pelo fato de termos a chave estrangeira vinculada ao produto e com isso não seria possível excluir apenas o registro isolado do produto)
app.delete('/api/excluirProduto/:id', (req, res) => {
    const id_produto = req.params.id;

    // Excluir o registro de estoque
    const estoqueQuery = 'DELETE FROM estoque WHERE id_produto_estoque = ?';
    db.query(estoqueQuery, [id_produto], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o estoque:', err);
            res.status(500).json({ error: 'Erro ao excluir o estoque.' });
        } else {
            // Verificar se algum registro foi excluído na tabela de estoque
            if (result.affectedRows > 0) {
                // Excluir o registro de produto
                const produtoQuery = 'DELETE FROM produtos WHERE id_produto = ?';
                db.query(produtoQuery, [id_produto], (err, result) => {
                    if (err) {
                        console.error('Erro ao excluir o produto:', err);
                        res.status(500).json({ error: 'Erro ao excluir o produto.' });
                    } else {
                        if (result.affectedRows > 0) {
                            res.status(200).json({ message: 'Produto excluído com sucesso.' });
                        } else {
                            res.status(404).json({ error: 'Produto não encontrado.' });
                        }
                    }
                });
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////////

//                   OPERAÇÕES RELACIONADAS A USUÁRIOS                   //

///////////////////////////////////////////////////////////////////////////

// Pegar todos os registros na tabela usuários
app.get('/api/getUsuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter os usuários:', err);
            res.status(500).json({ error: 'Erro ao obter os usuários.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Pegar os dados dos usuários juntamente com o seu nível de acesso
app.get('/api/getUsuariosComNivel', (req, res) => {
    const query = `
      SELECT u.*, n.nome_acesso, s.nome_setor
      FROM usuarios AS u
      JOIN nivel_acessos AS n ON u.nivel_acesso_usuario = n.id_nivel_acesso
      JOIN setor AS s ON u.setor_usuario = s.id_setor
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter os usuários com nível de acesso:', err);
            res.status(500).json({ error: 'Erro ao obter os usuários com nível de acesso.' });
        } else {
            res.status(200).json(result);
        }
    });
});


// Pegar os dados de um usuário pelo ID
app.get('/api/getUsuarios/:id', (req, res) => {
    const id_usuario = req.params.id;
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';

    db.query(query, [id_usuario], (err, result) => {
        if (err) {
            console.error('Erro ao obter o usuário:', err);
            res.status(500).json({ error: 'Erro ao obter o usuário.' });
        } else {
            if (result.length > 0) {
                const usuario = result[0];
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        }
    });
});

// Editar um usuário pelo ID
app.put('/api/editarUsuario/:id', (req, res) => {
    const id_usuario = req.params.id;
    const { login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario } = req.body;
    const query = 'UPDATE usuarios SET login_usuario = ?, nome_usuario = ?, senha_usuario = ?, nivel_acesso_usuario = ? WHERE id_usuario = ?';
    const values = [login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario, id_usuario];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao editar o usuário:', err);
            res.status(500).json({ error: 'Erro ao editar o usuário.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        }
    });
});

// Excluir um usuário pelo ID
app.delete('/api/excluirUsuario/:id', (req, res) => {
    const id_usuario = req.params.id;
    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';

    db.query(query, [id_usuario], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o usuário:', err);
            res.status(500).json({ error: 'Erro ao excluir o usuário.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Usuário excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        }
    });
});

// Cadastrar um usuário
app.post('/api/cadastrarUsuario', (req, res) => {
    const { login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario, setor_usuario } = req.body;
    const query = 'INSERT INTO usuarios (login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario, setor_usuario) VALUES (?, ?, ?, ?, ?)';
    const values = [login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario, setor_usuario];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar o usuário:', err);
            res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
        } else {
            res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
        }
    });
});

// Cadastrar uma requisicao
app.post('/api/cadastrarRequisicao', (req, res) => {
    const { id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto } = req.body;
    const query = 'INSERT INTO requisicoes (id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto) VALUES (?, ?, ?, ?)';
    const values = [id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar uma requisicao:', err);
            res.status(500).json({ error: 'Erro ao cadastrar uma requisicao.' });
        } else {
            res.status(200).json({ message: 'Requisicao cadastrada com sucesso.' });
        }
    });
});

// Autenticação do usuário
app.post('/api/login', (req, res) => {
    const { usuario, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE login_usuario = ? AND senha_usuario = ?';

    db.query(query, [usuario, senha], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false });
        } else {
            if (results.length > 0) {
                // Login bem-sucedido
                res.status(200).json({ success: true });
            } else {
                // Credenciais inválidas
                res.status(200).json({ success: false });
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////////

//                   OPERAÇÕES RELACIONADAS A SETORES                    //

///////////////////////////////////////////////////////////////////////////

// Obter todos os setores
app.get('/api/getSetores', (req, res) => {
    const query = 'SELECT * FROM setor';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao obter os setores:', err);
            res.status(500).json({ error: 'Erro ao obter os setores.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Obter o setor pelo seu ID
app.get('/api/getSetor/:id', (req, res) => {
    const id_setor = req.params.id;
    const query = 'SELECT * FROM setor WHERE id_setor = ?';

    db.query(query, [id_setor], (err, result) => {
        if (err) {
            console.error('Erro ao obter o setor:', err);
            res.status(500).json({ error: 'Erro ao obter o setor.' });
        } else {
            if (result.length > 0) {
                const setor = result[0];
                res.status(200).json(setor);
            } else {
                res.status(404).json({ error: 'Setor não encontrado.' });
            }
        }
    });
});

// Cadastrar setor
app.post('/api/cadastrarSetor', (req, res) => {
    const { nome_setor } = req.body;
    const query = 'INSERT INTO setor (nome_setor) VALUES (?)';
    const values = [nome_setor];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar o setor:', err);
            res.status(500).json({ error: 'Erro ao cadastrar o setor.' });
        } else {
            res.status(201).json({ message: 'Setor cadastrado com sucesso.' });
        }
    });
});

// Editar setor
app.put('/api/editarSetor/:id', (req, res) => {
    const id_setor = req.params.id;
    const { nome_setor } = req.body;
    const query = 'UPDATE setor SET nome_setor = ? WHERE id_setor = ?';
    const values = [nome_setor, id_setor];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao editar o setor:', err);
            res.status(500).json({ error: 'Erro ao editar o setor.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Setor atualizado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Setor não encontrado.' });
            }
        }
    });
});

// Excluir setor
app.delete('/api/excluirSetor/:id', (req, res) => {
    const id_setor = req.params.id;
    const query = 'DELETE FROM setor WHERE id_setor = ?';

    db.query(query, [id_setor], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o setor:', err);
            res.status(500).json({ error: 'Erro ao excluir o setor.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Setor excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Setor não encontrado.' });
            }
        }
    });
});

// Status do servidor
app.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port);
});
