const { Schema,model } = require('mongoose')

const usuarioChema = Schema({
    first_name:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    last_name:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        require: [true, 'El Correo es obligatorio'],
        unique: true
    },
    age:{
        type: Number,
        require: [true, 'El edad es obligatorio']
    },
    password:{
        type: String,
        require: [true, 'El password es obligatorio']
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
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
    const { __v, password,_id, last_name, age, estado, google, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model( 'Usuario', usuarioChema )