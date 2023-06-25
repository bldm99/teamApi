const mongoose = require('mongoose')
const Schema = mongoose.Schema



/*const mySchema = new Schema({
    dueño:{type:String},
    nombre:{type:String},
    precio:{type:String},
    imagen:{type:String},
   

})*/

const mySchema = new Schema({
    dueño:{type:String},
    d_email:{type:String},
    telefono:{type:String},
    tarjeta:{type:String},
    suscripcion:{type:String},
    total_productos:{type:String},
    productos:[{
        nombre:{type:String},
        precio:{type:String},
        imagen:{type:String},
        stock:{type:String},
        f_Inicio:{type:String},
        f_Final:{type:String},
        descripcion:{type:String},
    }],
    pagina:[{
        titulo:{type:String},
        banner:{type:String},
        descripcion:{type:String},
        color:{type:String},
        logo:{type:String},
        wasap:{type:String},
    }],
    personalizacion:[{
        paginahtml:{type:String} 
    }],
    clientes:[{
        correo:{type:String},
        password:{type:String},
        pais:{type:String}, 
    }],
    pedidos:[{
        correo_cliente:{type:String},
        nombre_producto:{type:String},
        imagen_producto:{type:String}, 
        precio_producto:{type:String}, 
        direccion:{type:String}, 
        cantidad:{type:String}, 
        estado:{type:String}, /* Definir como el unico campo actualizable */
    }]

})




module.exports = mongoose.model('prueba' , mySchema)

/*{
    "dueño": "Peña",
    "d_email": "test@gmail.com",
    "telefono": "800",
    "tarjeta": "000",
    "suscripcion": "Platino",
    "total_productos": "20",
  }*/