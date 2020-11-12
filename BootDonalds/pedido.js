const express = require("express");
const router = express.Router();

let productos = require("./productos")

router.get("/", function(req, res) {
    let db = req.app.locals.db

    db.collection("pedido").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)

        }
    })

})

router.post("/menu", function(req, res) {
    let db = req.app.locals.db

    let precio = parseFloat(req.body.precio)
    let nombre = req.body.nombre
    let carne = req.body.nombre
    let bebida = req.body.bebida
    let patatas = req.body.patatas
    let tipo = req.body.tipo

    let pedido = { eliminar: "si", tipo: tipo, nombre: nombre, carne: carne, bebida: bebida, patatas: patatas, precio: precio }

    db.collection("pedido").insertOne(pedido, function(err, datos) {
        if (err !== null) {
            res.send({ error: true, mensaje: "Ha habido un error: " + err })
        } else {
            res.send({ error: false, datos: datos })
        }
    })

})


router.post("/hamburguesa", function(req, res) {
    let db = req.app.locals.db

    let precio = parseFloat(req.body.precio)
    let hamburguesa = req.body.nombre
    let patatas = req.body.patatas
    let tipo = req.body.tipo

    let pedido = { eliminar: "si", tipo: tipo, nombre: hamburguesa, patatas: patatas, precio: precio }

    db.collection("pedido").insertOne(pedido, function(err, datos) {
        if (err !== null) {
            res.send({ error: true, mensaje: "Ha habido un error: " + err })
        } else {
            res.send({ error: false, datos: datos })
        }
    })

})

router.post("/bebida", function(req, res) {
    let db = req.app.locals.db

    let precio = parseFloat(req.body.precio)
    let bebida = req.body.nombre
    let tipo = req.body.tipo


    let pedido = { eliminar: "si", tipo: tipo, nombre: bebida, precio: precio }

    db.collection("pedido").insertOne(pedido, function(err, datos) {
        if (err !== null) {
            res.send({ error: true, mensaje: "Ha habido un error: " + err })
        } else {
            res.send({ error: false, datos: datos })
        }
    })


})

router.delete("/borrar", function(req, res) {
    let db = req.app.locals.db

    db.collection("pedido").deleteMany({ eliminar: "si" }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)

        }
    })

})

router.put("/editar", function(req, res) {
    let db = req.app.locals.db


    let nombre = req.body.nombre
    let tipo = req.body.tipo

    db.collection("pedido").deleteOne({ $and: [{ tipo: tipo }, { nombre: nombre }] }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)

        }
    })



})

router.delete("/borrarProducto", function(req, res) {
    let db = req.app.locals.db

    let tipo = req.body.tipo
    let nombre = req.body.nombre

    db.collection("pedido").deleteMany({ $and: [{ tipo: tipo }, { nombre: nombre }] }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)

        }
    })


})

module.exports = router;