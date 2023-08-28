const express = require('express');
const cors = require('cors');
const { EccomersBd } = require('./DAO/database/db');

class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 8080
        this.path = {
            usuarios: '/api/usuarios',
            categoria: '/api/categorias',
            productos: '/api/products',
            auth: '/api/auth',
            carts: '/api/carts',
            resetPassword: '/api/reset-password'
        }

        this.eccomerBd();
        this.middlaware();
        this.routers()
    }

    //conexion con la base de datos
    async eccomerBd(){
        await EccomersBd()
    }
    //middlaware
    middlaware(){
        this.app.use( cors() )
        this.app.use( express.json() )
        this.app.use( express.static( 'public' ) )
    }
    //RutasC:\Users\User\Documents\CoderBack\coderBack\src\routers
    routers(){
        this.app.use(this.path.productos, require('./routers/productos'));
        this.app.use(this.path.carts, require('./routers/carts'));
        this.app.use(this.path.usuarios, require('./routers/usuarios'));
        this.app.use(this.path.categoria, require('./routers/categorias'));
        this.app.use(this.path.auth, require('./routers/auth'));
        this.app.use(this.path.resetPassword, require('./routers/resetPassword'))
    }
    //subida del servidor
    listen(){
        this.app.listen(this.PORT, console.log(`Servidor en el puerto ${this.PORT}`));
    }
}

module.exports = Server;