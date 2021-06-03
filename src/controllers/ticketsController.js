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
        connection.query(sql, (err, ticket) => {
            if(err) {
                console.log(err);
            } else {
                var mensaje1 = "";
                if(ticket == undefined || ticket.length == 0)
                mensaje1 = "Ticket no encontrado";

                res.json({data: ticket, mensaje: mensaje1})
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
            return res.status(400).send({ error: true, mensaje: "La prioridad es obligatoria"});
        }
        if(!ticket.estatus) {
            return res.status(400).send({ error: true, mensaje: "El estatus es obligatorio"});
        }
        if(!ticket.personalID) {
            return res.status(400).send({ error: true, mensaje: "Debe seleccionar una Persona"});
        }
        if(!ticket.categoriaID) {
            return res.status(400).send({ error: true, mensaje: "Debe seleccionar una Categoria"});
        }

        let sql = "INSERT INTO Tickets set ?";

        connection.query(sql, [ticket], (err, data) => {
            if(err) {
                console.log(err);
            } else {
                
                res.json({error: false, data, mensaje: "Ticket creado con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const ticket = req.body;

        let sql = "UPDATE Tickets set ? WHERE id = ?";
        connection.query(sql, [ticket, id], (err, data) => {
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
        let sql = "DELETE from Tickets WHERE id = ?";

        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0){
                    mensaje = "Ticket no encontrado";
                } else {
                    mensaje = "Ticket eliminado con exito";
                }

                res.json({error: false, data, mensaje: mensaje});
            }
        })
    }
}

module.exports = {
    listar,
    obtenerTicket,
    crear,
    editar,
    eliminar
}