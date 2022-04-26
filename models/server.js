const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config')





class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
    

        // COnectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // // Rutas de mi aplicación
         this.routes();

   
    }

    async conectarDB() {
        await dbConnection();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directotio Público
        this.app.use(express.static('public'));

        // Parseo body
        this.app.use(express.urlencoded({extended:true}));
       
    }

    models() {
        this.app.use(require('../models/order'));
        this.app.use(require('../models/product'));
    }

    routes() {
        this.app.use(require('../routes/orders'));
        this.app.use(require('../routes/products'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}



module.exports = Server;