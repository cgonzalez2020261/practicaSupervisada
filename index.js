const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/IN6BV_practica2', {  useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
    console.log('se ha conectado correctamente a la base de datos.');

    app.listen(3000, function(){
        console.log("servidor de exprex corriendo correctamente en el puerto 3000")
    });
}).catch(err => console.log(error));