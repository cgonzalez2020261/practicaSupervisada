const express = require('express');
const app = express();
const cors = require('cors');

const personaRoute = require('./src/routers/persona.routers');
const cursoRoute = require('./src/routers/curso.routers');
const asignaturaRoute = require('./src/routers/asignaturas.routers')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', personaRoute, cursoRoute, asignaturaRoute);

module.exports = app;