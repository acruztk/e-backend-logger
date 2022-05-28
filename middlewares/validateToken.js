const Authorization = require('../models/authorization')

const validateToken = async (req, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const authorization = await Authorization.findOne({ _id: '6291c368b324e300902caf96' })

        if (!authorization) {
            return res.status('401').json({
                msg: 'No existe el token en la base de datos'
            })
        }
        res.locals.authorization = authorization

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validateToken
}
