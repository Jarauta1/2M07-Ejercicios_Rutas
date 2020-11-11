const express = require("express");
/* const mongodb = require("mongodb"); */
const app = express();
/* let MongoClient = mongodb.MongoClient; */


let menu = require("./menu")
let hamburguesa = require("./hamburguesa")
let bebida = require("./bebida")
let pedido = require("./pedido")


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

/* let db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if (err !== null) {
        console.log(err)
    } else {
        app.locals.db = client.db("hotel")
    }
}) */


app.use("/menu",menu)
app.use("/hamburguesa",hamburguesa)
app.use("/bebida",bebida)
/* app.use("/pedido",pedido) */


app.listen(3000);