const jwt = require("jsonwebtoken")

const generarJWT = ( uid = '', time ) => {

    return new Promise( (resolve, reject) =>{
        const payload = { uid }
        jwt.sign( payload, process.env.pass, {
            expiresIn: time
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })

}

module.exports = generarJWT