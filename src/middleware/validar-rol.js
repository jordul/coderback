const { response, request } = require("express");

const validarRol = ( ...roles ) => {

    return ( req = request, res = response, next ) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Primero valida el token antes que el rol'
            })
        }

        if( !roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: 'El rol no esta permitido para realizar estas acciones'
            })
        }

        next()
    }
}

module.exports = validarRol
