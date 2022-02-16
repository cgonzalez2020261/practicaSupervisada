const express = require('express');
const controladorAsignatura = require('../controllers/asignacion.controller');

const api = express.Router();

api.post('/agregarAsignatura', controladorAsignatura.AgregarAsignatura);


module.exports = api;