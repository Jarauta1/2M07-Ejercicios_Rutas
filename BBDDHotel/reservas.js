const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    let db = req.app.locals.db

    db.collection("reservas").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

router.post("/entrada", function(req, res) {

    let db = req.app.locals.db

    let dni = parseInt(req.body.dni)
    let habitacion = parseInt(req.body.habitacion)
    let fechaIn = req.body.fechaIn

    db.collection("clientes").find({ dni: dni }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send(err)
        } else {

            if (datos.length === 0) {
                res.send({ error: true, mensaje: `El DNI: ${dni} no está registrado en nuestra base de datos.
                No puede realizarse la reserva.` })
            } else {
                let nombre = datos[0].nombre
                let apellido1 = datos[0].apellido1
                let apellido2 = datos[0].apellido2

                db.collection("habitaciones").find({ habitacion: habitacion }).toArray(function(err, datos) {
                    if (err !== null) {
                        res.send({ error: true, mensaje: `La habitación ${habitación} no existe.
                        No puede llevarse a cabo la reserva` })
                    } else {

                        if (datos[0].estado === "Libre") {

                            db.collection("habitaciones").updateOne({ habitacion: habitacion }, { $set: { estado: "Ocupada" } }, function(err, datos) {
                                if (err !== null) {
                                    console.log(err)
                                    res.send({ mensaje: "Error:" + err })
                                } else {
                                    res.send(datos)
                                }
                            })

                            let reserva = {
                                dni: dni,
                                nombre: nombre,
                                apellido1: apellido1,
                                apellido2: apellido2,
                                habitacion: habitacion,
                                fechaIn: fechaIn,
                                fechaOut: "-"
                            }

                            db.collection("reservas").insertOne(reserva, function(err, datos) {
                                if (err !== null) {
                                    console.log(err)
                                    res.send({ mensaje: "Error: " + err })
                                }
                            })



                        } else {
                            res.send({ error: true, mensaje: `La habitación ${datos[0].habitacion} está ocupada. 
                            No se puede llevar a cabo la reserva.` })
                        }
                    }
                })
            }
        }
    })
})

router.put("/salida", function(req, res) {

    let db = req.app.locals.db

    let dni = parseInt(req.body.dni)
    let fechaOut = req.body.fechaOut

    db.collection("reservas").find({ dni: dni }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send(err)
        } else {

            if (datos.length === 0) {
                res.send({ error: true, mensaje: `El DNI: ${dni} no está registrado en nuestra base de datos.
                No puede realizarse el check-out.` })
            } else {

                let habitacion = datos[0].habitacion



                db.collection("habitaciones").updateOne({ habitacion: habitacion }, { $set: { estado: "Libre" } }, function(err, datos) {
                    if (err !== null) {
                        console.log(err)
                        res.send({ mensaje: "Error:" + err })
                    } else {
                        db.collection("reservas").updateOne({ dni: dni }, { $set: { fechaOut: fechaOut } }, function(err, data) {
                            if (err !== null) {
                                console.log(err)
                                res.send({ mensaje: "Error:" + err })
                            } else {

                                res.send(data)


                            }
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;