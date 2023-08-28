const { request, response } = require('express');
const { Usuarios } = require("../DAO/models");
const jwt = require("jsonwebtoken")
const generarJWT = require("../DAO/helpers/jwt");
const nodemailer = require("nodemailer");
const { validar } = require('../middleware/validarJwt');

const validarLink = async(req, res = response) => {
  const token = req.query.token;
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = await jwt.verify( token, process.env.pass )

        const usuario = await Usuarios.findById( uid )

        if(!usuario){
            return res.redirect(301, `${process.env.URLPROD}/api/reset-password/link`)
            /* res.status(401).json({
                msg: 'link no valido - usuarion no existe en la BD'
            }) */
        }

        //verificar si la uid tiene el estado true
        if( !usuario.estado ){
            return res.redirect(301, `${process.env.URLPROD}/api/reset-password/link`)
        }

        res.redirect(301, `${process.env.URLPROD}/api/reset-password/vistaNewPassword/${token}`)
    } catch (error) {
        console.log(error)
        res.redirect(301, `${process.env.URLPROD}/api/reset-password/link`)  
    }
}

const resetPassword = async(req = request, res = response) => {

    const {email} = req.body
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      try {
        
        const user = await Usuarios.findOne({ email: email });
        if (!user) {
          return res.status(400).send("Usuario no existe");
        }
    
        const token = await generarJWT(user._id, "1h");

        const url = `${process.env.URLPROD}/api/reset-password?token=${token}`;
        transporter.sendMail(
          {
            to: user.email,
            subject: "Restablecimiento de contraseña",
            html: `Haga clic <a href="${url}">aquí</a> para restablecer su contraseña.`,
          },
          (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).send("Error sending email.");
            }
          }
        );
        res.status(200).json({ msg: 'Correo enviado, por favor revisa tu buzón.' })
      } catch (error) {
        console.log(error);
        return res.status(500).send("Error al validar el Correo.");
      }
    
   
}

const newPassword = async( req = request, res = response ) => {
  const {id} = req.params
  const newpassword = req.body.password

  const uid = await validar(id);

  if (!uid) {
    return res.status(400).send("token no valido");
  }

  const user = await Usuarios.findById(uid);

  if(user._doc.password === newpassword){
    return res.status(400).json({
      msg: "La contraseña no puede ser igual a la anterior"
    });
  }

  await Usuarios.findByIdAndUpdate(uid, { password: newpassword })

  res.status(201).json({
    msg: "contraseña Actualizada"
  })
} 

module.exports = {
    resetPassword,
    validarLink,
    newPassword
}