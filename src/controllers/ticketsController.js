const connection = require('../config/connection');

function listar(req, res) {
    if(connection) {
        let sql = "SELECT * FROM Tickets";
        connection.query(sql, (err, tickets) => {
            if(err) {
                res.json(err);
            } else {
                console.log(tickets);
                res.json(tickets);
            }
        });
    }
}

function obtenerTicket(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = `SELECT * FROM Tickets WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, tickets) => {
            if(err) {
                console.log(err);
            } else {
                var mensaje1 = "";
                if(tickets == undefined || tickets.length == 0)
                mensaje1 = "Tickets no encontrada";

                res.json({data: tickets, mensaje: mensaje1})
            }
        })
    }
}

function crear(req, res) {
    if(connection) {
        console.log(req.body);
        const ticket = req.body;

        if(!ticket.nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio"});
        }
        if(!ticket.prioridad) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio"});
        }

        /*if(ticket.descripcion && persona.descripcion.length !== 10 ) {
            return res.status(400).send({ error: true, mensaje: "La longitud debe ser de 10 caracteres"});
        }*/

        let sql = "INSERT INTO persona set ?";

        connection.query(sql, [persona], (err, data) => {
            if(err) {
                console.log(err);
            } else {
                
                res.json({error: false, data, mensaje: "Persona creada con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const persona = req.body;

        let sql = "UPDATE persona set ? WHERE id = ?";
        connection.query(sql, [persona, id], (err, data) => {
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
        let sql = "DELETE from persona WHERE id = ?";

        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0){
                    mensaje = "Persona no encontrada";
                } else {
                    mensaje = "Persona eliminada con exito";
                }

                res.json({error: false, data, mensaje: mensaje});
            }
        })
    }
}

module.exports = {
    listar,
    obtenerPersona,
    crear,
    editar,
    eliminar
}