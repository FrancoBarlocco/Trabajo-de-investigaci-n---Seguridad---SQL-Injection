import express, { Application } from "express";
import multer from 'multer';
import router from "../routes";

class Server {

    private app: Application;
    private port: string | number;
  
    private Path = {
        general: '/api/general'
    }
  
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT || 5050
        this.middlewares();
        this.routes();
    }
  
  
    middlewares() {
        const bodyParser = require('body-parser');
        const cors = require('cors');
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
  
    routes() {
        const upload = multer();
        this.app.use(this.Path.general, upload.none(), router);
    }
  
    listen() {
      
      this.app.listen(this.port, () => {
          console.log(`Server running on port ${this.port}`);
      });
    }
  }
  export default Server;