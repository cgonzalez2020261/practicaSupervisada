const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AsignaturasSchema = Schema({
   idAsignatura: {type: Schema.Types.ObjectId, ref: 'Cursos'},
    idAlumno: {type: Schema.Types.ObjectId, ref: 'Personas'}
})

module.exports = mongoose.model('Asignatura', AsignaturasSchema);