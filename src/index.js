const express = require('express');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 3000);

//MIIDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//BASE DE DATOS
require('./config/connection');

//RUTAS
app.use(require('./routes/categoriasRoutes'));
app.use(require('./routes/personasRoutes'));
app.use(require('./routes/ticketsRoutes'));

//Levantar el servidor
app.listen(app.get('port'), (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Servidor en puerto: ${app.get('port')}`)
    }
})