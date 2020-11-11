const express = require("express");
const router = express.Router();

let productos = require("./productos")

router.post("/menu", function(req, res) {
    let db = req.app.locals.db

    let precio = parseInt(req.body.precio)
    let hamburguesa = req.body.hamburguesa
    let bebida = req.body.bebida
    let patatas = req.body.patatas

    let pedido = { hamburguesa: hamburguesa, bebida: bebida, patatas: patatas, precio: precio }

    db.collection("pedido").insertOne(pedido, function(err, datos) {
        if (err !== null) {
            res.send({ error: true, mensaje: "Ha habido un error: " + err })
        } else {
            res.send({ error: false, datos: datos })
        }
    })

})

router.get("/", function(req, res) {
    let db = req.app.locals.db

    db.collection("pedido").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
            console.log(datos)
        }
    })
})

router.post("/hamburguesas", function(req, res) {
    let db = req.app.locals.db

    let precio = parseInt(req.body.precio)
    let hamburguesa = req.body.hamburguesa
    let patatas = req.body.patatas

    let pedido = { hamburguesa: hamburguesa, patatas: patatas, precio: precio }

    db.collection("pedido").insertOne(pedido, function(err, datos) {
        if (err !== null) {
            res.send({ error: true, mensaje: "Ha habido un error: " + err })
        } else {
            res.send({ error: false, datos: datos })
        }
    })

})

module.exports = router;