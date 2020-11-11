const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    let db = req.app.locals.db

    db.collection("clientes").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

router.post("/registro", function(req, res) {

    let db = req.app.locals.db

    let dni = parseInt(req.body.dni)
    let nombre = req.body.nombre
    let apellido1 = req.body.apellido1
    let apellido2 = req.body.apellido2

    let registrar = { nombre: nombre, apellido1: apellido1, apellido2: apellido2, dni: dni }

    db.collection("clientes").insertOne(registrar, function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error: " + err })
        } else {
            res.send(datos)
        }
    })

})

router.put("/editar", function(req, res) {

    let db = req.app.locals.db

    let dni = parseInt(req.body.dni)
    let nombre = req.body.nombre
    let apellido1 = req.body.apellido1
    let apellido2 = req.body.apellido2


    db.collection("clientes").updateOne({ dni: dni }, { $set: { nombre: nombre, apellido1: apellido1, apellido2: apellido2 } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })

})


module.exports = router;