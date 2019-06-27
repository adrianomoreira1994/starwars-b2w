const PlanetRepository = require('../repositories/planet.repository');
const ApiValidator = require('../validators/api.validator');
const config = require('../../bin/config');
const request = require('request');
const axios = require('axios');

class PlanetController {
  async index(req, res) {
    try {
      const planets = await PlanetRepository.fetch();

      if (!planets.length)
        res
          .status(200)
          .send({ message: 'Nenhum planeta encontrado', success: false });

      return res.status(200).send({ data: planets, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Erro ao processoar sua requisição', success: false });
    }
  }

  async store(req, res) {
    try {
      const { name, terrain, climate } = req.body;
      const validator = new ApiValidator();
      validator.isRequired(name, 'Nome do planeta é obrigatório');
      validator.isRequired(terrain, 'Terreno é obrigatório');
      validator.isRequired(climate, 'Clima é obrigatório');

      if (!validator.isValid())
        return res
          .status(400)
          .send({ errors: validator.errors(), success: false });

      const response = await axios.get(
        `${config.swapi}planets/?search=${name}`
      );
      let apparitions = 0;
      for (var data of response.data.results) {
        apparitions = data.films.length;
      }

      const planets = await PlanetRepository.register({
        name,
        terrain,
        climate,
        apparitions
      });
      return res.status(200).send(planets);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Erro ao processar sua requisição' });
    }
  }

  async getByName(req, res) {
    try {
      const validator = new ApiValidator();
      validator.isRequired(
        req.body.name,
        'Para buscar um planeta é necessário informar o nome dele'
      );

      if (!validator.isValid())
        return res
          .status(400)
          .send({ errors: validator.errors(), success: false });

      const planet = await PlanetRepository.fetchByName(req.body.name);
      return res.status(200).send({ data: planet, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Erro ao processoar sua requisição', success: false });
    }
  }

  async getById(req, res) {
    try {
      const planet = await PlanetRepository.fetchById(req.params.id);
      return res.status(200).send({ data: planet, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Erro ao processoar sua requisição', success: false });
    }
  }

  async delete(req, res) {
    try {
      await PlanetRepository.remove(req.params.id);
      return res
        .status(200)
        .send({ message: 'Planeta removido com sucesso.', success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Erro ao processoar sua requisição', success: false });
    }
  }
}

module.exports = new PlanetController();
