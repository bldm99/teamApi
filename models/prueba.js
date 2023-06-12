const mongoose = require('mongoose')
const Schema = mongoose.Schema



const mySchema = new Schema({
    dueño:{type:String},
    nombre:{type:String},
    precio:{type:String},
    imagen:{type:String},
   

})


module.exports = mongoose.model('prueba' , mySchema)