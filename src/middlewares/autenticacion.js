const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = 'clave_secreta';

exports.Auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(500).send({mensaje: "la peticion no tiene cabezera de authorizacion"});
    }

    var token = req.headers.authorization.replace(/['  "]+/g, '');

    try {
        var payload = jwt_simple.decode(token, claveSecreta);
        if (payload.exp <= moment().unix()){
            return res.status(500).send({mensaje: "el token a expirado"})
        }
    }catch (error){
        return res.status(500).send({mensaje: "el mensaje no es valido"})
    }

    req.user = payload;     
    next();
}