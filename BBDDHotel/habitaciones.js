const express = require("express");
const router = express.Router();

router.get("/", function (req,res){
    let db = req.app.locals.db

    db.collection("habitaciones").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

module.exports = router;