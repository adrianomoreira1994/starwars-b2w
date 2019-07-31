const PlanetRepository = require("../repositories/planet.repository");
const ApiValidation = require("../validators/api.validator");

class PlanetController {
  async index(req, res) {
    try {
      const planets = await PlanetRepository.fetch();

      if (!planets.length)
        res.status(404).send({ message: "Nenhum planeta encontrado", success: false });

      const planetas = Promise.all(planets.map(async function (planet) {
        let aparicoes = await PlanetRepository.fetchApparitionsByPlanet(planet.name);


        return {
          name: planet.name,
          climate: planet.climate,
          terrain: planet.terrain,
          apparitions: aparicoes
        };
      }));

      return res.status(200).send({ data: await planetas, success: true });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição", success: false });
    }
  }

  async getByName(req, res) {
    try {
      const planet = await PlanetRepository.fetchByName(req.params.planet);
      if (!planet)
        return res.status(404).send({ message: `Nenhum planeta com o nome [${req.params.planet}] encontrado`, success: false });

      return res.status(200).send({ data: planet, success: true });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }

  async store(req, res) {
    try {
      const { name, terrain, climate } = req.body;

      const validation = new ApiValidation();
      validation.isRequired(name, "Nome do planeta é obrigatório");
      validation.isRequired(terrain, "Terreno é obrigatório");
      validation.isRequired(climate, "Clima é obrigatório");

      if (!validation.isValid())
        return res
          .status(400)
          .send({ errors: validation.errors(), success: false });

      const planets = await PlanetRepository.register({ name, terrain, climate });
      return res.status(201).send({ success: true, data: planets });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }

  async getById(req, res) {
    try {
      const planet = await PlanetRepository.fetchById(req.params.id);

      if (!planet) return res.status(404).send({ message: "Planeta inexistente", success: false });

      return res.status(200).send({ data: planet, success: true });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }

  async delete(req, res) {
    try {
      await PlanetRepository.remove(req.params.id);
      return res.status(200).send({ message: "Planeta removido com sucesso.", success: true });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }
}

module.exports = new PlanetController();
