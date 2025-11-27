import express from 'express';
import cors from 'cors';
import routerCliente from './router/clientes.js';
import dataBase from './config/database.js'
import routerAtendimento from './router/atendimento.js'


const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1', routerCliente, routerAtendimento)

const port = 3000
dataBase.db
.sync({force: false})
.then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    })
})
.catch((e) => {
    console.log('Erro ao conectar com o banco de dados: ' + e);
})