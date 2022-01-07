const express = require('express');
const server = express();
server.use(express.json());
const lista = []; 



server.get('/teste', (req, res) => {
    return res.json(lista);
})

server.get('/teste/:index', (req, res) => {
    const { index } = req.params; 
    return res.json(lista[index]);
})


server.post('/teste', (req, res) => {
    const { name } = req.body; 
    lista.push(name);
    
    return res.json(lista); 
    
})


server.put('/teste/:index', (req, res) => {
    const { index } = req.params; 
    const { name } = req.body;
    
    lista[index] = name; 
    
    return res.json(lista);
});


server.delete('/teste/:index', (req, res) => {
    const { index } = req.params; 
    
    lista.splice(index, 1);
    
    return res.send();
}); 


server.listen(3000); 