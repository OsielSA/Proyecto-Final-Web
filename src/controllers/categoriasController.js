const connection = require('../config/connection');

function listar(req, res) {
    if(connection) {
        let sql = "SELECT * FROM Categorias";
        connection.query(sql, (err, categorias) => {
            if(err) {
                res.json(err);
            } else {
                console.log(categorias);
                res.json(categorias);
            }
        });
    }
}

function obtenerCategoria(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = `SELECT * FROM Categorias WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, categoria) => {
            if(err) {
                console.log(err);
            } else {
                var mensaje1 = "";
                if(categoria == undefined || categoria.length == 0)
                mensaje1 = "Categoria no encontrada";

                res.json({data: categoria, mensaje: mensaje1})
            }
        })
    }
}

function crear(req, res) {
    if(connection) {
        console.log(req.body);
        const categoria = req.body;

        if(!categoria.nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio"});
        }

        let sql = "INSERT INTO Categorias set ?";

        connection.query(sql, [categoria], (err, data) => {
            if(err) {
                console.log(err);
            } else {
                
                res.json({error: false, data, mensaje: "Categoria creada con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const categoria = req.body;

        let sql = "UPDATE Categorias set ? WHERE id = ?";
        connection.query(sql, [categoria, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La informacion es la misma";
                }
                res.json({error: false, data, mensaje: mensaje });
            }
        })
        
    }
}

function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE from Categorias WHERE id = ?";

        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0){
                    mensaje = "Categoria no encontrada";
                } else {
                    mensaje = "Categoria eliminada con exito";
                }

                res.json({error: false, data, mensaje: mensaje});
            }
        })
    }
}

module.exports = {
    listar,
    obtenerCategoria,
    crear,
    editar,
    eliminar
}