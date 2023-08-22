const { response, request } = require('express')
const {Usuarios} = require('../DAO/models/index')
const bcrypt = require('bcrypt')

const usuariosGet = async( req = request, res = response )=> {
    const { limite = 5, desde = 0 } = req.query
    const UsuarioActivo = { estado: true }
    const [total, usuarios] = await Promise.all([
        Usuarios.countDocuments( UsuarioActivo ),
        Usuarios.find( UsuarioActivo )
            .limit( Number(limite) )
            .skip( Number(desde) )
    ])
    res.json({total,usuarios})
}

const usuariosPut = async ( req = request , res = response )=> {
    const id = req.params.id
    const { _id, password, rol, google, correo, ...resto } = req.body
    
    if( password ){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt )
    }

    const usuario = await Usuarios.findByIdAndUpdate(  id, resto )

    res.send(resto)
}

const usuariosPost = async( req = request, res = response )=> {
    
    const { nombre, correo,password, rol } = req.body
    const usuario = new Usuarios( {nombre, correo,password, rol} )
    
    //Encriptar la constraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt )
    await usuario.save()
    res.send(usuario)
}

const usuariosDelete = async ( req = request , res = response )=> {
    const { id, uid } = req.params

    //Borrado fisico completo
    /* const usuarioDelete = await Usuario.findByIdAndDelete( id ) */
    //Borrado recomendado
    const usuarioDelete = await Usuarios.findByIdAndUpdate( id, { estado: false } )

    res.json({usuarioDelete})
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}