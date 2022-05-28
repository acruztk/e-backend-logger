const mongoose = require('mongoose')

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CDN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la conexion de la base de datos")
    }
}

module.exports = {
    dbConnection
}