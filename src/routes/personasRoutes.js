const express = require('express');

const routes = express.Router();

const personasController = require('../controllers/personasController');

routes.get('/Personas/', personasController.listar)

routes.get('/Personas/:id', personasController.obtenerPersona)

routes.post('/Personas/', personasController.crear)

routes.put('/Personas/:id', personasController.editar);

routes.delete('/Personas/:id', personasController.eliminar);

module.exports = routes;