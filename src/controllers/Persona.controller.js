const Persona = require('../models/persona.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloMaestro = new Persona();
    
        if(parametros.nombres && parametros.apellidos && parametros.email
            && parametros.password) {
                Persona.find({ email : parametros.email }, (err, maestrosEncontrados) => {
                    if ( maestrosEncontrados.length > 0 ){ 
                        return res.status(500)
                            .send({ mensaje: "Este correo ya se encuentra utilizado" })
                    } else {
                        modeloMaestro.nombres = parametros.nombres;
                        modeloMaestro.apellidos = parametros.apellidos;
                        modeloMaestro.email = parametros.email;
                        modeloMaestro.rol = 'MAESTRO';
                        
    
                        bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                            modeloMaestro.password = passwordEncriptada;
    
                            modeloMaestro.save((err, maestroGuardado)=>{
                                if(err) return res.status(500)
                                    .send({ mensaje : 'Error en la peticion' })
                                if(!maestroGuardado) return res.status(500)
                                    .send({ mensaje: 'Error al guardar el maestro' })
        
                                return res.status(200).send({ maestro: maestroGuardado})
                            })
                        })                    
                    }
                })
        } else {
            return res.status(404)
                .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
        }
    
    }

    function RegistrarAlumnos(req, res) {
        var parametros = req.body;
        var modeloAlumno = new Persona();
        
            if(parametros.nombres && parametros.apellidos && parametros.email
                && parametros.password) {
                    Persona.find({ email : parametros.email }, (err, alumnosEncontrados) => {
                        if ( alumnosEncontrados.length > 0 ){ 
                            return res.status(500)
                                .send({ mensaje: "Este correo ya se encuentra utilizado" })
                        } else {
                            modeloAlumno.nombres = parametros.nombres;
                            modeloAlumno.apellidos = parametros.apellidos;
                            modeloAlumno.email = parametros.email;
                            modeloAlumno.rol = 'ALUMNO';
                            
        
                            bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                                modeloAlumno.password = passwordEncriptada;
        
                                modeloAlumno.save((err, alumnoGuardado)=>{
                                    if(err) return res.status(500)
                                        .send({ mensaje : 'Error en la peticion' })
                                    if(!alumnoGuardado) return res.status(500)
                                        .send({ mensaje: 'Error al guardar el maestro' })
            
                                    return res.status(200).send({ alumno: alumnoGuardado})
                                })
                            })                    
                        }
                    })
            } else {
                return res.status(404)
                    .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
            }
        
        }

        function Login(req, res) {
            var parametros = req.body;
            // BUSCAMOS EL CORREO
            Persona.findOne({ email : parametros.email }, (err, personaEncontrada) => {
                if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
                if (personaEncontrada){
                    // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
                    bcrypt.compare(parametros.password, personaEncontrada.password, 
                        (err, verificacionPassword) => {//TRUE OR FALSE
                            if (verificacionPassword) {
                                return res.status(200)
                                    .send({ token: jwt.crearToken(personaEncontrada) })
                            } else {
                                return res.status(500)
                                    .send({ mensaje: 'La contrasena no coincide.'})
                            }
                        })
                } else {
                    return res.status(500)
                        .send({ mensaje: 'El usuario, no se ha podido identificar'})
                }
            })
        }

    module.exports = {
        RegistrarMaestro,
        RegistrarAlumnos,
        Login
    }