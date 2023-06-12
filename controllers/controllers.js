const expresHandler = require('express-async-handler')
const prueba = require('../models/prueba')


//Ver todos los productos disponibles
const verPrueba = expresHandler(async (req, res) => {
    const tableprueba = await prueba.find()
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


//Guardar Productos
const guardarPrueba = expresHandler(async (req, res) => {
    //destructurando
    const { dueño, nombre , precio , imagen  } = req.body

    const tableprueba = await prueba.insertMany({
        dueño: dueño,
        nombre: nombre,
        precio: precio,
        imagen: imagen
    })
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


module.exports = {
    verPrueba,
    guardarPrueba,
    
}