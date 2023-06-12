
const express = require('express')

const { verPrueba , guardarPrueba } = require('../controllers/controllers')

const Router = express.Router()

Router.route("/pruebas").get(verPrueba).post(guardarPrueba)

module.exports = {
    Router
}