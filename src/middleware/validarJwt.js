const { request, response } = require("express");
const jwt = require("jsonwebtoken")
const {Usuarios} = require("../DAO/models")

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify( token, process.env.pass )

        const usuario = await Usuarios.findById( uid )

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuarion no existe en la BD'
            })
        }

        //verificar si la uid tiene el estado true
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - estado en false'
            })
        }

        req.usuario = usuario

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })   
    }
}

const validar = async(token, req = request, res = response)=>{
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    
    try {
        const {uid} = await jwt.verify( token, process.env.pass )
        return uid
    } catch (error) {
        console.log(error)
        return null
    }
}


module.exports =  {
    validarJWT,
    validar
}
