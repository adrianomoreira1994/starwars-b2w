const Planet = require("../schemas/planet.schema");
const axios = require("axios");

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

  async fetchApparitionsByPlanet(planet) {
    const response = await axios.get(
      `${process.env.SWAPI}planets/?search=${planet}`
    );
    let apparitions = 0;
    for (var data of response.data.results) {
      apparitions = data.films.length;
    }

    return apparitions;
  }
}

module.exports = new PlanetRepository();
