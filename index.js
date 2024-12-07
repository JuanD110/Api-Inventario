const express = require('express');
const { getConnection } = require( './db/db-connection')
const dotenv = require('dotenv'); 
const cors = require ('cors');
const Usuario = require('./router/usuario'); 


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/login', require('./router/auth'));
app.use('/usuario', require('./router/usuario'));
app.use('/estadoEquipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/marca', require('./router/marca'));
app.use('/tipoEquipo', require('./router/tipoEquipo'));

app.listen(port, () => {
  console.log(`App listen on port ${port}`);

}) 