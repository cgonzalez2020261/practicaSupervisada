const express = require('express');
const controladorPersona = require('../controllers/Persona.controller');

const api = express.Router();

api.post('/registrarMaestro', controladorPersona.RegistrarMaestro);
api.post('/registrarAlumno', controladorPersona.RegistrarAlumnos);
api.post('/login', controladorPersona.Login);

module.exports = api;