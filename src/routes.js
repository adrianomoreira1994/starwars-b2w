const routes = require("express").Router();
const planetController = require("./controllers/planet.controller");
const userController = require("./controllers/user.controller");
const authService = require('./services/auth.service');

// Planets
routes.get("/api/planets", authService.authorize, planetController.index);
routes.get("/api/planets/:planet", authService.authorize, planetController.getByName);

routes.post("/api/planets", authService.authorize, planetController.store);
routes.delete("/api/planets/:id", authService.authorize, planetController.delete);

routes.get("/api/planets/buscar/:id", authService.authorize, planetController.getById);

// Users
routes.post("/api/users/authenticate", userController.authenticate);
routes.get("/api/users", userController.index);
routes.post("/api/users", userController.store);
routes.delete("/api/users/:id", authService.authorize, userController.delete);

module.exports = routes;
