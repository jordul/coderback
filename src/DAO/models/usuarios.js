const { Schema,model } = require('mongoose')

const usuarioChema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El Correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'El password es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        require: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

usuarioChema.methods.toJSON = function () {
    const { __v, password,_id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model( 'Usuario', usuarioChema )