const expresHandler = require('express-async-handler')
const prueba = require('../models/prueba')

/*Reutilizables */
var jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../utils/tokenManager');
function valiarPassword(front, back) {
    return bcryptjs.compare(front, back)
}


//Ver todos los productos disponibles
const verPrueba = expresHandler(async (req, res) => {
    const tableprueba = await prueba.find()
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


//Registrar usuarios e inicializar sus datos
const guardarPrueba = expresHandler(async (req, res) => {
    const { dueño, d_email, d_password, telefono, tarjeta, suscripcion, total_productos } = req.body

    const tableprueba = await prueba.insertMany({
        dueño,
        d_email,
        d_password,
        telefono,
        tarjeta,
        suscripcion,
        total_productos
    })

    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})



//Buscar usuario
const buscarUsuario = expresHandler(async (req, res) => {
    const tableprueba = await prueba.findById(req.params.id)
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})
//Actualizar usuario
const actualizarUsuario = expresHandler(async (req, res) => {
    //destructurando
    const { dueño, d_email, telefono, tarjeta, suscripcion, total_productos } = req.body
    const tableprueba = await prueba.findByIdAndUpdate(
        req.params.id,
        {
            dueño,
            d_email,
            telefono,
            tarjeta,
            suscripcion,
            total_productos
        },
        {
            new: true
        }
    )
    if (!tableprueba) {
        res.status(500).json({ message: "No exitoos" })
    }
    res.status(200).json(tableprueba);
})


//Registrar productos de usuario
const registrarData = expresHandler(async (req, res) => {
    //destructurando
    const { _id, nombre, precio, imagen, stock, f_Inicio, f_Final, descripcion, html, sku } = req.body;
    const tableprueba = await prueba.updateOne({ _id: _id }, {
        $push: {
            'productos': {
                nombre,
                precio,
                imagen,
                stock,
                f_Inicio,
                f_Final,
                descripcion,
                html,
                sku
            }
        }
    })
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})

//Actualizar los productos de usuario
const actualizarProducto = expresHandler(async (req, res) => {
    try {
        const { _id, productoId, nombre, precio, imagen, stock, f_Inicio, f_Final, descripcion, html, sku } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        else {
            console.log(_id)
        }

        // Encuentra el índice del producto en la matriz de productos
        const indiceProducto = documento.productos.findIndex(
            (producto) => producto._id.toString() === productoId
        );

        if (indiceProducto === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        // Actualiza los campos específicos del producto
        documento.productos[indiceProducto].nombre = nombre;
        documento.productos[indiceProducto].precio = precio;
        documento.productos[indiceProducto].imagen = imagen;
        documento.productos[indiceProducto].stock = stock;
        documento.productos[indiceProducto].f_Inicio = f_Inicio;
        documento.productos[indiceProducto].f_Final = f_Final;
        documento.productos[indiceProducto].descripcion = descripcion;
        documento.productos[indiceProducto].html = html;
        documento.productos[indiceProducto].sku = sku;

        // Guarda el documento actualizado en la base de datos
        await documento.save();

        //Campos que seran mostrados
        const productoActualizado = {
            _id: documento._id,
            nombre: documento.productos[indiceProducto].nombre,
            precio: documento.productos[indiceProducto].precio,
            imagen: documento.productos[indiceProducto].imagen,
            stock: documento.productos[indiceProducto].stock,
            f_Inicio: documento.productos[indiceProducto].f_Inicio,
            f_Final: documento.productos[indiceProducto].f_Final,
            descripcion: documento.productos[indiceProducto].descripcion,
            descripcion: documento.productos[html].html,
            descripcion: documento.productos[sku].sku,
        };

        res.status(200).json(productoActualizado);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});


//Elimnar unico producto
const eliminarProducto = expresHandler(async (req, res) => {
    try {
        const { _id, productoId } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Encuentra el índice del producto en la matriz de productos
        const indiceProducto = documento.productos.findIndex(
            (producto) => producto._id.toString() === productoId
        );

        if (indiceProducto === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Elimina el producto de la matriz
        documento.productos.splice(indiceProducto, 1);

        // Guarda el documento actualizado en la base de datos
        await documento.save();

        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});










//Buscar todos los productos de un solo usuario
const buscarProductos = expresHandler(async (req, res) => {
    try {
        const { _id } = req.query; // Obtener el ID del usuario desde los parámetros de la URL

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        const productos = documento.productos;

        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar los productos' });
    }
});



//Buscar un solo producto
const buscarProducto = async (req, res) => {
    try {
        const { _id, productoId } = req.query;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Busca el producto por su ID
        const producto = documento.productos.find(
            (producto) => producto._id.toString() === productoId
        );

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
};



//Registrar html de pagina del usario
const registrarHtml = expresHandler(async (req, res) => {
    //destructurando
    const { _id, paginahtml } = req.body;
    const tableprueba = await prueba.updateOne({ _id: _id }, {
        $push: {
            'personalizacion': {
                paginahtml
            }
        }
    })
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


//Buscar un solo paginaHtml
/*const buscarPagina = async (req, res) => {
    try {
        const { _id, paginaId } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Busca el producto por su ID
        const pagina = documento.personalizacion.find(
            (pagina) => pagina._id.toString() === paginaId
        );

        if (!pagina) {
            return res.status(404).json({ error: 'Pagina no encontrado' });
        }

        res.status(200).json(pagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar pagina' });
    }
};*/

// Buscar la primera páginaHtml
const buscarPagina = async (req, res) => {
    try {
        const { _id } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Obtener la primera página del arreglo de personalización
        const primeraPagina = documento.personalizacion[0];

        if (!primeraPagina) {
            return res.status(404).json({ error: 'No se encontró ninguna página' });
        }

        res.status(200).json(primeraPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar la primera página' });
    }
};


//Actualizar PsginaHtml
const actualizarPagina = expresHandler(async (req, res) => {
    try {
        const { _id, paginaId, paginahtml } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        else {
            console.log(_id)
        }

        // Encuentra el índice del paginaHtml en la matriz de perzonalizacion
        const indicePagina = documento.personalizacion.findIndex(
            (pagina) => pagina._id.toString() === paginaId
        );

        if (indicePagina === -1) {
            return res.status(404).json({ error: 'Pagina no encontrado' });
        }
        // Actualiza los campos específicos del perzonalizacion
        documento.personalizacion[indicePagina].paginahtml = paginahtml;


        // Guarda el documento actualizado en la base de datos
        await documento.save();

        res.status(200).json(documento);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la pagina' });
    }
});

/*----------------------------------------------------------------------------------------------*/
//Registrar datos de PaginaReact del usuario
const registrarPaginaReact = expresHandler(async (req, res) => {
    //destructurando
    const { _id, titulo, banner, descripcion, color, logo, wasap, sub1, sub2, sub3, sub4 } = req.body;
    const tableprueba = await prueba.updateOne({ _id: _id }, {
        $push: {
            'pagina': {
                titulo,
                banner,
                descripcion,
                color,
                logo,
                wasap,
                sub1,
                sub2,
                sub3,
                sub4,
            }
        }
    })
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


//Buscar pagina unica REACT
/*const buscarPaginaReact = async (req, res) => {
    try {
        const { _id, paginaId } = req.query;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Busca la página por su ID
        const paginaReact = documento.pagina.find(
            (pagina) => pagina._id.toString() === paginaId
        );

        if (!paginaReact) {
            return res.status(404).json({ error: 'PaginaReact no encontrado' });
        }

        res.status(200).json(paginaReact);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar página' });
    }
};*/

const buscarPaginaReact = async (req, res) => {
    try {
        const { _id } = req.query;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Buscar la primera página
        const primeraPaginaReact = documento.pagina[0];

        if (!primeraPaginaReact) {
            return res.status(404).json({ error: 'No se encontró ninguna página' });
        }

        res.status(200).json(primeraPaginaReact);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar la página' });
    }
};

//Elimnar unico Pagian react segun su id
const eliminarPaginaReact = expresHandler(async (req, res) => {
    try {
        const { _id, paginaId } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Encuentra el índice del paginaReact en la matriz de pagina
        const indicePaginaReact = documento.pagina.findIndex(
            (pagina) => pagina._id.toString() === paginaId
        );

        if (indicePaginaReact === -1) {
            return res.status(404).json({ error: 'PagianReact no encontrado' });
        }

        // Elimina pagina de la matriz
        documento.pagina.splice(indicePaginaReact, 1);

        // Guarda el documento actualizado en la base de datos
        await documento.save();

        res.status(200).json({ message: 'PaginaReact eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el PaginaReact' });
    }
});

//Actualizar pagina React del usuario 
const actualizarPaginaReact = async (req, res) => {
    try {
        const { _id, paginaId, titulo, banner, descripcion, color, logo, wasap, sub1, sub2, sub3, sub4 } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Encuentra el índice de la PaginaReact en la matriz de páginas
        const indicePagina = documento.pagina.findIndex(
            (pagina) => pagina._id.toString() === paginaId
        );

        if (indicePagina === -1) {
            return res.status(404).json({ error: 'Página no encontrada' });
        }

        // Actualiza los campos específicos de la PaginaReact
        documento.pagina[indicePagina].titulo = titulo;
        documento.pagina[indicePagina].banner = banner;
        documento.pagina[indicePagina].descripcion = descripcion;
        documento.pagina[indicePagina].color = color;
        documento.pagina[indicePagina].logo = logo;
        documento.pagina[indicePagina].wasap = wasap;
        documento.pagina[indicePagina].sub1 = sub1;
        documento.pagina[indicePagina].sub2 = sub2;
        documento.pagina[indicePagina].sub3 = sub3;
        documento.pagina[indicePagina].sub4 = sub4;

        // Guarda el documento actualizado en la base de datos
        const documentoActualizado = await documento.save();

        // Selecciona solo los campos necesarios para la respuesta
        const respuesta = {
            //_id: documentoActualizado._id,
            pagina: documentoActualizado.pagina[indicePagina],
        };
        res.status(200).json(respuesta);



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la página' });
    }
};


/*-------------------------------------------------------------------------------------------------------------------*/
//Registrar datos de clientes del usuario
const registrarCliente = expresHandler(async (req, res) => {
    //destructurando
    const { _id, correo, password, pais } = req.body;
    const tableprueba = await prueba.updateOne({ _id: _id }, {
        $push: {
            'clientes': {
                correo,
                password,
                pais
            }
        }
    })
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


//Buscar  clientes del Usuario
const buscarClientes = expresHandler(async (req, res) => {
    try {
        const { _id } = req.query; // Obtener el ID del usuario desde los parámetros de la URL

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        const clientes = documento.clientes;

        res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar los clientes' });
    }
});


/*-----------------------------------------------------------Pedidos-------------------------------------------------------*/
//Registrar pedidos hechos a usuario
const registrarPedido = expresHandler(async (req, res) => {
    //destructurando
    const { _id, correo_cliente, nombre_producto, imagen_producto, precio_producto, direccion, cantidad, estado,
        sku_p, postal, total, metodo_pago } = req.body;
    const tableprueba = await prueba.updateOne({ _id: _id }, {
        $push: {
            'pedidos': {
                correo_cliente,
                nombre_producto,
                imagen_producto,
                precio_producto,
                direccion,
                cantidad,
                estado,
                sku_p,
                postal,
                total,
                metodo_pago,
            }
        }
    })
    if (!tableprueba) {
        res.status(500).json({ error: "No found" })
    }
    res.status(200).json(tableprueba);
})


//Buscar todos los Pedidos hechos al Usuario
const buscarPedidos = expresHandler(async (req, res) => {
    try {
        const { _id } = req.query; // Obtener el ID del usuario desde los parámetros de la URL

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        const pedidos = documento.pedidos;

        res.status(200).json(pedidos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar los pedidos' });
    }
});

//Buscar un pedido unico
const buscarPedido = async (req, res) => {
    try {
        const { _id, pedidoId } = req.query;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Busca pedido por su ID
        const pedidox = documento.pedidos.find(
            (pedido) => pedido._id.toString() === pedidoId
        );

        if (!pedidox) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(pedidox);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar pedido' });
    }
};

//Actualizar Pedido del usuario 
const actualizarPedido = async (req, res) => {
    try {
        const { _id, pedidoId, correo_cliente, nombre_producto, imagen_producto, precio_producto, direccion, cantidad, estado,
            sku_p, postal, total, metodo_pago } = req.body;

        const documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Encuentra el índice del pedido  en la matriz de pedidos
        const indicePedido = documento.pedidos.findIndex(
            (pedido) => pedido._id.toString() === pedidoId
        );

        if (indicePedido === -1) {
            return res.status(404).json({ error: 'Página no encontrada' });
        }

        // Actualiza los campos específicos del pedido
        documento.pedidos[indicePedido].correo_cliente = correo_cliente;
        documento.pedidos[indicePedido].nombre_producto = nombre_producto;
        documento.pedidos[indicePedido].imagen_producto = imagen_producto;
        documento.pedidos[indicePedido].precio_producto = precio_producto;
        documento.pedidos[indicePedido].direccion = direccion;
        documento.pedidos[indicePedido].cantidad = cantidad;
        documento.pedidos[indicePedido].estado = estado;

        documento.pedidos[indicePedido].sku_p = sku_p;
        documento.pedidos[indicePedido].postal = postal;
        documento.pedidos[indicePedido].total = total;
        documento.pedidos[indicePedido].metodo_pago = metodo_pago;

        // Guarda el documento actualizado en la base de datos
        const documentoActualizado = await documento.save();
        // Selecciona solo los campos necesarios para la respuesta
        const respuesta = {
            //_id: documentoActualizado._id,
            pedidos: documentoActualizado.pedidos[indicePedido],
        };
        //res.status(200).json(respuesta);
        res.status(200).json({ update: "actualizado" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
};


/*------------------------------------Sesiones de logeo y registtros */

const register = async (req, res) => {
    // Destructurando
    const { _id, correo, password, pais } = req.body;
    try {
        // Verificar si el correo electrónico ya está registrado
        const correoExistente = await prueba.findOne({ "clientes.correo": correo });
        if (correoExistente) {
            return res.status(400).json({ error: "El correo electrónico ya existe" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcryptjs.hash(password, 10);

        const tableprueba = await prueba.updateOne({ _id: _id },
            {
                $push: {
                    clientes: {
                        correo: correo,
                        password: hashedPassword,
                        pais: pais
                    }
                }
            }
        );

        console.log(tableprueba)

        if (!tableprueba) {
            return res.status(500).json({ error: "Not found" });
        }
        // Consultar el documento actualizado para obtener el ID del último cliente registrado
        const clienteRegistrado = await prueba.findOne({ _id: _id });
        const idCliente = clienteRegistrado.clientes[clienteRegistrado.clientes.length - 1]._id;
        const emailCliente = clienteRegistrado.clientes[clienteRegistrado.clientes.length - 1].correo;

        // Generar token JWT utilizando el ID del cliente registrado
        const { token, expiresIn } = generateToken(idCliente, emailCliente);

        return res.status(200).json({ token, expiresIn });
    } catch (error) {
        console.log(error.code);
        //return res.status(500).json({ error: "Error registering user" });
    }
};



const login = async (req, res) => {
    try {
        // Destructurando
        const { _id, correo, password } = req.body;

        // Verificar si el correo electrónico existe
        let documento = await prueba.findById(_id);
        if (!documento) {
            return res.status(403).json({ error: "Documento no econtrado" });
        }


        const xcliente = documento.clientes.find((cliente) => cliente.correo === correo);

        if (!xcliente) {
            return res.status(403).json({ error: "El usuario no existe" });
        }

        //Validamos 
        const validacionp = await valiarPassword(password, xcliente.password)
        if (!validacionp) {
            return res.status(403).json({ error: "Contraseña incorrecta" });
        }

        //generar token JWT
        const { token, expiresIn } = generateToken(xcliente._id, xcliente.correo)
        return res.json({ token, expiresIn })
        //return res.status(500).json(xcliente)
    } catch (error) {
        console.log(error)
    }
}

const ejemplo = async (req, res) => {
    try {
        const { _id } = req.query;

        const documento = await prueba.findById(_id);
        console.log(req.uid)
        if (!documento) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }


        const clientex = documento.clientes.find(
            (cliente) => cliente._id.toString() === req.uid
        );

        if (!clientex) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }


        res.status(200).json({ id: clientex._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar pedido' });
    }
}


//Registro e i nicio de sesion de clientes de Teamfy
const registerUser = expresHandler(async (req, res) => {
    const { dueño, d_email, d_password, telefono, tarjeta, suscripcion, total_productos,
        titulo, banner, descripcion, color, logo, wasap, sub1, sub2, sub3, sub4
    } = req.body
    try {
        // Verificar si el correo electrónico ya está registrado
        const correoExistente = await prueba.findOne({ "d_email": d_email });
        if (correoExistente) {
            return res.status(400).json({ error: "El correo electrónico ya existe" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcryptjs.hash(d_password, 10);
        const tableprueba = new prueba({
            dueño,
            d_email,
            d_password: hashedPassword,
            telefono,
            tarjeta,
            suscripcion,
            total_productos,
            pagina: {
                titulo,
                banner,
                descripcion,
                color,
                logo,
                wasap,
                sub1,
                sub2,
                sub3,
                sub4
            }
        })

        if (!tableprueba) {
            res.status(500).json({ error: "No found" })
        }

        const savedClient = await tableprueba.save();

        // _id del cliente registrado
        const clienteId = savedClient._id;
        const cliented_email = savedClient.d_email;

        // Generar token JWT utilizando el ID del cliente registrado
        const { token, expiresIn } = generateToken(clienteId, cliented_email);
        return res.status(200).json({ token, expiresIn });

    } catch (error) {
        console.log(error.code);
    }

})


const loginUser = async (req, res) => {
    try {
        // Destructurando
        const { d_email, d_password } = req.body;

        // Verificar si el correo electrónico existe
        let user = await prueba.findOne({ d_email });
        if (!user) {
            return res.status(403).json({ error: "No existe el usuario" });
        }


        //Validamos 
        const validacionp = await valiarPassword(d_password, user.d_password)
        if (!validacionp) {
            return res.status(403).json({ error: "Contraseña incorrecta" });
        }

        //generar token JWT
        const { token, expiresIn } = generateToken(user._id, user.d_email)
        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    verPrueba,
    guardarPrueba,
    buscarUsuario,
    actualizarUsuario,
    registrarData,
    actualizarProducto,
    eliminarProducto,
    buscarProductos,
    buscarProducto,
    registrarHtml,
    buscarPagina,
    actualizarPagina,

    registrarPaginaReact,
    buscarPaginaReact,
    eliminarPaginaReact,
    actualizarPaginaReact,

    registrarCliente,
    buscarClientes,

    registrarPedido,
    buscarPedidos,
    buscarPedido,
    actualizarPedido,

    login,
    register,

    ejemplo,

    registerUser,
    loginUser,


}