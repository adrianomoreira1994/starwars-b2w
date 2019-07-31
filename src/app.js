const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
