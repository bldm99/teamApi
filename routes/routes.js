
const express = require('express')
const {body} = require('express-validator')

const { verPrueba,
    guardarPrueba,
    registrarData,
    actualizarProducto,
    actualizarUsuario,
    buscarUsuario, 
    registrarPaginaReact,
    eliminarProducto,
    buscarProducto,
    buscarProductos,
    registrarHtml,
    buscarPagina,
    actualizarPagina,
    buscarPaginaReact,
    eliminarPaginaReact,
    actualizarPaginaReact,
    registrarCliente,
    buscarClientes,
    registrarPedido,
    buscarPedido,
    actualizarPedido,
    buscarPedidos,
    login,
    register,
    ejemplo,
    registerUser,
    loginUser} = require('../controllers/controllers')

const { ResultadoValidation } = require('../middlewares/ResultadoValidation')
const { requireToken } = require('../middlewares/requireToken')

const Router = express.Router()


Router.route("/pruebas").get(verPrueba).post(guardarPrueba)  //ver todos usuarios y registrarlos 
Router.route("/pruebas/:id").get(buscarUsuario).put(actualizarUsuario)
Router.route("/data").post(registrarData).put(actualizarProducto).delete(eliminarProducto).get(buscarProducto) //agregar productos y actualizar productos
Router.route("/userpr").get(buscarProductos) //Bucsca todos los productos pero solo de un usuario

Router.route("/paginaHtml").post(registrarHtml).get(buscarPagina).put(actualizarPagina) //Bucsca todos los productos pero solo de un usuario

//Linnk peticiones Pagina React
Router.route("/paginaReact").get(buscarPaginaReact).post(registrarPaginaReact).delete(eliminarPaginaReact).put(actualizarPaginaReact)

//Link peticiones paraClientes de usuario
Router.route("/cliente").post(registrarCliente).get(buscarClientes)


//Link peticiones para pedidos hechos al usuario
Router.route("/pedido").post(registrarPedido).get(buscarPedido).put(actualizarPedido)
Router.route("/pedidos").get(buscarPedidos)



//Pruebas logeo y  register
Router.post(
    "/register",
    [
        body('correo' , 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Formato de password incorrecto')
            .trim()
            .isLength({min:6})
    ],
    ResultadoValidation,
    register
)

Router.post(
    "/login",
    [
        body('correo' , 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Minimo 6 caracteres')
            .trim()
            .isLength({min:6})
    ],
    ResultadoValidation,
    login
)

Router.get("/protegido", requireToken , ejemplo)



//Tutas para el regidtro e i nicio de sesion de clientes de Teamfy

Router.post(
    "/teamfyregister",
    [
        body('d_email' , 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('d_password', 'Formato de password incorrecto')
            .trim()
            .isLength({min:6})
    ],
    ResultadoValidation,
    registerUser
)

Router.post(
    "/teamfylogin",
    [
        body('d_email' , 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('d_password', 'Formato de password incorrecto')
            .trim()
            .isLength({min:6})
    ],
    ResultadoValidation,
    loginUser
)



module.exports = {
    Router
} 