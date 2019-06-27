const Planet = require('../schemas/planet.schema');

class PlanetRepository {
  constructor() {}

  async fetch() {
    return await Planet.find({});
  }

  async fetchByName(name) {
    return await Planet.findOne({ name });
  }

  async fetchById(id) {
    return await Planet.findById(id);
  }

  async register(data) {
    return await Planet.create(data);
  }

  async remove(id) {
    return await Planet.findOneAndDelete(id);
  }
}

module.exports = new PlanetRepository();
