const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = 'clave_secreta';


exports.crearToken = function (persona){
    let payload = {
        sub: persona._id,
        nombres: persona.nombres,
        email: persona.email,
        rol: persona.rol,
        iat: moment().unix(),
        exp: moment().day(7, 'days').unix()

    }

    return jwt_simple.encode(payload, claveSecreta);
}