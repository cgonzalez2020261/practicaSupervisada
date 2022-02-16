const express = require('express');
const controladorCurso = require('../controllers/cursos.controller');

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarCurso', md_autenticacion.Auth ,controladorCurso.RegistrarCurso);
api.put('/editarCurso/:idCurso', md_autenticacion.Auth, controladorCurso.editarCurso);
api.get('/verCursos', controladorCurso.ObtenerCurso);
api.delete('/eliminarCursos/:idCurso', md_autenticacion.Auth, controladorCurso.eliminarCurso);


module.exports = api;