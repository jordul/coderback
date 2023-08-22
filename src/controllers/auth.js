const { response, request } = require("express");
const {Usuarios} = require("../DAO/models/index");
const bcrypt = require("bcrypt");
const generarJWT = require("../DAO/helpers/jwt");
const { googleVerify } = require("../DAO/helpers/google-verify");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    //validar si el correo existe mediante .findOne
    const usuario = await Usuarios.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo o contaraseña invalida : correo",
      });
    }

    //Validar si el usuario sigue vigente o fue eliminado

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario no vigente",
      });
    }

    //Validar constraseña mediante bcrypt
    const passwordValidate = bcrypt.compareSync(password, usuario.password);
    if (!passwordValidate) {
      return res.status(400).json({
        msg: "Correo o contraseña invalida: password",
      });
    }

    //JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const loginGoogle = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const {correo,nombre,img} = await googleVerify(id_token);
    let usuario = await Usuarios.findOne({ correo })
    //usuarion existe
    if( !usuario ){
        const data = {
            nombre,
            correo,
            password: ':p',
            img,
            google:true
        }
        usuario = new Usuarios( data );
        await usuario.save();
    }

    //Validar el estado del usuario
    if( !usuario.estado ){
        return res.status(401).json({
            msg: 'Hable cone le admistrador, usuario bloqueado'
        })
    }

    //Generar el jwt
    const token = await generarJWT( usuario.id )

    res.status(200).json({
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
        ok:false,
        msg: 'El token no se pudo verificar'
    })
  }
};

module.exports = {
  login,
  loginGoogle,
};
