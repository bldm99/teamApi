
const express = require('express')

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
    buscarPedidos} = require('../controllers/controllers')

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



module.exports = {
    Router
} 