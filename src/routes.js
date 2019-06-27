const routes = require('express').Router();
const planetController = require('./controllers/planet.controller');

routes.get('/v1/api/planets', planetController.index);
routes.get('/v1/api/planets/:planet', planetController.getByName);
routes.get('/v1/api/planets/:id', planetController.getById);

routes.post('/v1/api/planets', planetController.store);
routes.delete('/v1/api/planets/:id', planetController.delete);

module.exports = routes;
