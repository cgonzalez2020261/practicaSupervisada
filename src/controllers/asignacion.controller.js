
const { models } = require('mongoose');
const Asignatura = require('../models/asignaturas.models');

function AgregarAsignatura(req, res){
    var parametro = req.body;
    var modelAsignatura = new Asignatura();

    if(parametro.idAsignatura && parametro.idAlumno){
        Asignatura,findOne({ idAsignatura: parametro.idAsignatura }, (err, asignaturaEncontradas) => {
            if( asignaturaEncontradas.length > 0){
                return res.status(500).send({ message:'esta asignatura ya se encuentra asignada'})
            
        
              }else {
                modelAsignatura.idAsignatura = parametros.idAsignatura;
                modelAsignatura.idAlumno = parametros.idAlumno;


                modelAsignatura.save((err, AsignaturaGuardado)=>{
                    if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                    if(!AsignaturaGuardado) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })

                    return res.status(200).send({ Asignatura: AsignaturaGuardado})

                })                    
            }
        })
} else {
    return res.status(404)
        .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
}

}

module.exports = {
    AgregarAsignatura
}