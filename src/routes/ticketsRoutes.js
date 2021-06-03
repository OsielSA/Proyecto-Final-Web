const express = require('express');

const routes = express.Router();

const ticketsController = require('../controllers/ticketsController');

routes.get('/Tickets/', ticketsController.listar)

routes.get('/Tickets/:id', ticketsController.obtenerTicket)

routes.post('/Tickets/', ticketsController.crear)

routes.put('/Tickets/:id', ticketsController.editar);

routes.delete('/Tickets/:id', ticketsController.eliminar);

module.exports = routes;