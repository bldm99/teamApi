
// Importar las dependencias
const express = require('express');
const { Router } = require('./routes/routes');
const { connect } = require('./database/config');
const app = express();


const cors = require('cors');
require('dotenv').config();


//Configuaracion express
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use("/",Router)


app.get("/", (req, res) => {
    res.send("Hola mundo");
});

const port = process.env.PORT || 3000
//conectando a la DB
connect() 

// Iniciar el servidor HTTP en el puerto 3000
app.listen(port, function () {
    console.log('Servidor escuchando en http://localhost:3000');
});



//MONGODB_URL = mongodb+srv://bldm147:5eI0JHrqszPDO7rb@cluster0.npwmfxa.mongodb.net/dbapi?retryWrites=true&w=majority
//MONGODB_URL=mongodb://127.0.0.1:27017/Lab7
