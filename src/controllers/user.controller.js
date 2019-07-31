const ApiValidation = require("../validators/api.validator");
const repository = require("../repositories/user.repository");
const authService = require("../services/auth.service");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
  async index(req, res) {
    try {
      var users = await repository.fetch();

      if (!users) return res.status(404).send({ message: "Nenhum usuário encontrado", success: false })

      return res.status(200).send({ data: users, success: true });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async store(req, res) {
    try {
      const { name, document, email, password, confirmPassword } = req.body;

      const validation = new ApiValidation();
      validation.isEquals(password, confirmPassword);
      validation.isFixedLen(document, 11, "Documento deve conter até 11 caracteres");

      if (!validation.isValid()) {
        return res.status(400).send(validation.errors());
      }

      const user = await repository.register({ name, document, email, password });
      const payload = {
        name: user.name,
        email: user.email,
        document: user.document,
        id: user._id
      }

      const token = authService.generateToken(payload);
      return res.status(201).send({
        success: true, data: { token, user }
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }

  async delete(req, res) {
    try {
      await repository.remove(req.params.id);
      return res.status(200).send({ success: true });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }

  async authenticate(req, res) {
    try {
      const user = await repository.fetchByDocument(req.body.username);

      if (!await bcrypt.compare(req.body.password, user.password)) res.status(200).send({ message: "Senhas não são iguais" });

      const payload = {
        name: user.name,
        email: user.email,
        document: user.document,
        id: user._id
      }

      const token = await authService.generateToken(payload);
      res.status(200).send({ success: true, data: { token } });

    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao processoar sua requisição. " + error, success: false });
    }
  }
}

module.exports = new UserController();
