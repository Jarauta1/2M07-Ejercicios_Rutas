const express = require("express");
const mongodb = require("mongodb");
const app = express();
let MongoClient = mongodb.MongoClient;

let clientes = require("./clientes")
let reservas = require("./reservas")
let habitaciones = require("./habitaciones")

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if (err !== null) {
        console.log(err)
    } else {
        app.locals.db = client.db("hotel")
    }
})

app.use("/clientes", clientes)
app.use("/reservas", reservas)
app.use("/habitaciones", habitaciones)



app.listen(3000);