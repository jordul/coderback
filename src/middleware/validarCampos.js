const { validationResult } = require('express-validator')

const validarCampos = ( req,res,next ) => {
    const error = validationResult(req);
    console.log(error);
    if(!error.isEmpty()) return res.status(400).send(error)
    next()
}

module.exports = validarCampos