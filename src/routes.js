const routes = require("express").Router();
const planetController = require("./controllers/planet.controller");
const userController = require("./controllers/user.controller");
const authService = require('./services/auth.service');

// Planets
routes.get("/v1/api/planets", authService.authorize, planetController.index);
routes.get("/v1/api/planets/:planet", authService.authorize, planetController.getByName);

routes.post("/v1/api/planets", authService.authorize, planetController.store);
routes.delete("/v1/api/planets/:id", authService.authorize, planetController.delete);

routes.get("/v1/api/planets/buscar/:id", authService.authorize, planetController.getById);

// Users
routes.post("/api/users/authenticate", userController.authenticate);
routes.get("/api/users", authService.authorize, userController.index);
routes.post("/api/users", userController.store);
routes.delete("/api/users/:id", authService.authorize, userController.delete);

module.exports = routes;
