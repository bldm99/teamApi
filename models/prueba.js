const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bcryptjs = require('bcryptjs')


const mySchema = new Schema({
    dueño: { type: String },
    d_email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    d_password: {
        type: String,
        required: true,
    },

    telefono: { type: String },
    tarjeta: { type: String },
    suscripcion: { type: String },
    total_productos: { type: String },
    productos: [{
        nombre: { type: String },
        precio: { type: String },
        imagen: { type: String },
        stock: { type: String },
        f_Inicio: { type: String },
        f_Final: { type: String },
        descripcion: { type: String },
        html: { type: String },

        sku: { type: String },
    }],
    pagina: [{
        titulo: { type: String },
        banner: { type: String },
        descripcion: { type: String },
        color: { type: String },
        logo: { type: String },
        wasap: { type: String },

        sub1: { type: String },
        sub2: { type: String },
        sub3: { type: String },
        sub3: { type: String },
    }],
    personalizacion: [{
        paginahtml: { type: String }
    }],
    clientes: [{
        correo: {
            type: String,
            required: true,
            /*trim: true,
            unique: true,
            lowercase: true,
            index: { unique: true },*/
        },
        password: {
            type: String,
            required: true,
        },
        pais: { type: String },
    }],
    pedidos: [{
        correo_cliente: { type: String },
        nombre_producto: { type: String },
        imagen_producto: { type: String },
        precio_producto: { type: String },
        direccion: { type: String },
        cantidad: { type: String },
        estado: { type: String }, 

        sku_p: { type: String },
        postal: { type: String }, 
        total: { type: String }, 
        metodo_pago: { type: String }, 
        fecha_pedido: { type: Date, default: Date.now },

    }]

})

/*mySchema.pre("save" , async function(next){ 
    const client = this
    if(client.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSaltSync(10)
        client.clientes.password = await bcryptjs.hash(client.clientes.password , salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Fallo el hash de contraseña')
    }
})*/

//Creando emtodo perzonalizado
/*mySchema.methods.comparePassword = async function(canditatePassword){
    const client = this
    return await bcryptjs.compare(canditatePassword, this.clientes.password )
}*/






module.exports = mongoose.model('def', mySchema)

