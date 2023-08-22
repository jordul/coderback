const mongoose = require('mongoose');

const EccomersBd = async () => {

    try {
        await mongoose.connect( process.env.MONGODB)
        console.log('Base de datos online')
    } catch (error) {
        console.log(error,  process.env.MONGODB)
        throw new Error('No es posible conectar con la base de datos')
    }

}

module.exports = {
    EccomersBd
}
