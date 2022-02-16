const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PersonaSchema = Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    rol: String,
});

module.exports = mongoose.model('Personas' , PersonaSchema);