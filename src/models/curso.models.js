const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = Schema({
    Curso: String,
    idMaestro: {type: Schema.Types.ObjectId, ref: 'Personas'}
})

module.exports = mongoose.model('Cursos', CursoSchema);