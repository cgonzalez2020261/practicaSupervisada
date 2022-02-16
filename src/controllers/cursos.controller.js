const Curso = require('../models/curso.models');

function ObtenerCurso(req, res) {
    Curso.find({}, (err, cursosEncontrados) => {
        return res.send({ curso: cursosEncontrados });
    })
}

function RegistrarCurso(req, res) {
    var parametros = req.body;
    var modeloCurso = new Curso();

    if(req.user.rol == 'MAESTRO'){

        
        modeloCurso.Curso = parametros.Curso;
        modeloCurso.idMaestro = req.user.sub;

        modeloCurso.save((err, cursoGuardado) =>{
            if(err) return res.status(500).send({message: 'error en la peticion'});
            if(!cursoGuardado) return res.status(500).send({message: 'error al crear el curso'});

            return res.status(200).send({Curso: cursoGuardado});
        });
    }else{
        return res.status(500).send({message: 'No tiene los permisos para realizar esta accion'});
    }
}

function editarCurso(req, res) {
    var idCur = req.params.idCurso;
    var parametros = req.body;

    if( req.user.rol !== 'MAESTRO' ) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar los Cursos' });
    }

    Curso.findByIdAndUpdate(idCur, parametros, {new: true}, (err, cursoEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!cursoEditado) return res.status(500).send({mensaje: 'Error al editar el Curso'});

        return res.status(200).send({ Curso: cursoEditado });
    })
}

function eliminarCurso(req, res){
    var idCurs = req.params.idCurso;

    if(req.user.rol !== 'MAESTRO'){
        return res.status(500).send({ message: 'no tiene los permisos necesarios'})
    }

        Curso.findByIdAndDelete(idCurs, (err, cursoEliminado)=>{
        if (err) return res.status(500).send({mensaje: 'error en la peticion'});
        if(!cursoEliminado) return res.status(500).send({mensaje: 'error el eliminar Cursos'});

        return res.status(200).send({ Curso: cursoEliminado});
    })
}


module.exports = {
    RegistrarCurso,
    editarCurso,
    ObtenerCurso,
    eliminarCurso
}