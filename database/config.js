require('dotenv').config();

const mongoose = require('mongoose')
async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Conectado con Mogodb")
    } catch (error) {
        console.log(error)

    }
}

connect()

module.exports = {
    connect
}