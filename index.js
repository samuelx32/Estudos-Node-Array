const express = require('express');
const server = express();
const path = require('path');
const router = express.Router();
server.use(express.json());
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { append } = require('express/lib/response');
server.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

var quantidadePessoas = 1;
var quantidadeLivros = 2;

var pessoas = [{id: 0, nome: "João",idade: 12},{id: 1, nome:"Saulo", idade:15}]
var livros = [{id: 0, nome: "Senhor das Moscas"},{id: 1, nome: "Admiravel Mundo Novo"},{id: 2, nome: "Frankenstein"}];


server.get('/', function (req, res) {
    res.render('index');
})

server.get('/lista-pessoas', function (req, res) {
        var tipo = "PESSOAS";
        res.render('listaPessoas', {pessoas, tipo});
})

server.get('/lista-livros', function (req, res) {
    var tipo = "LIVROS";
    res.render('listaLivros', {livros,tipo});
})


server.get('/lista-pessoas/:index', (req, res) => {
    const { index } = req.params; 
    selecionado = pessoas[index];
    res.render('listaPessoas', {selecionado});
})

server.get('/lista-livros/:index', (req, res) => {
    const { index } = req.params; 
    selecionado = livros[index];
    res.render('listaLivros', {selecionado});
})

server.get('/formulario-pessoas', (req, res) => {
    res.render('formulario');
})

server.get('/formulario-livros', (req, res) => {
    res.render('formularioLivros');
})

server.post('/adicionarItem', (req, res) => {
    quantidadePessoas++;
    pessoas.push({id: quantidadePessoas,nome: req.body.nome, idade: req.body.idade});
    res.send('adicionado');    
})

server.post('/adicionarItemLivro', (req, res) => {
    quantidadeLivros++;
    livros.push({id: quantidadeLivros, nome: req.body.nome});
    res.send('adicionado');    
})

server.post('/alterar-livro-form', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    res.render('alterarLivroForm', {id, nome});
})

server.post('/alterar-pessoa-form', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var idade = req.body.idade;
    res.render('alterarPessoaForm', {id, nome,idade});
})



server.post('/alterar-livro', (req, res) => {
    livros[req.body.id] = {id: req.body.id,nome: req.body.nome}; 
    
    res.send('adicionado');
});

server.post('/alterar-pessoa', (req, res) => {
    pessoas[req.body.id] = {id: req.body.id,nome: req.body.nome, idade: req.body.idade}; 
    
    res.send('adicionado');
});


server.post('/deletar-pessoa', (req, res) => {
    const { index } = req.body.id; 
    pessoas.splice(index, 1);
    return res.send("Removido");
});  

server.post('/deletar-livro', (req, res) => {
    const { index } = req.body.id; 
    livros.splice(index, 1);
    return res.send("Removido");
}); 

server.listen(3000); 