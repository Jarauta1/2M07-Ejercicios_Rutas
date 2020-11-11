  
const express = require("express");
const router = express.Router();

let productos = require("./productos")

router.get("/", function (req,res){
    let db = req.app.locals.db

   res.send(productos.bebidas)
})

module.exports = router;