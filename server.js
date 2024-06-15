const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota POST para salvar logs
app.post('/save-logs', (req, res) => {
    const logs = req.body.logs;
    const filePath = path.join(__dirname, 'logs.txt');

    fs.appendFile(filePath, logs + '\n', (err) => {
        if (err) {
            console.error('Failed to save logs:', err);
            res.status(500).send('Failed to save logs');
        } else {
            res.status(200).send('Logs saved successfully');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
