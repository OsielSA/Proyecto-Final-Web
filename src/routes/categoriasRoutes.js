const express = require('express');

const routes = express.Router();

const categoriasController = require('../controllers/categoriasController');

routes.get('/Categorias/', categoriasController.listar)

routes.get('/Categorias/:id', categoriasController.obtenerCategoria)

routes.post('/Categorias/', categoriasController.crear)

routes.put('/Categorias/:id', categoriasController.editar);

routes.delete('/Categorias/:id', categoriasController.eliminar);

module.exports = routes;