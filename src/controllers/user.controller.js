const ApiValidation = require("../validators/api.validator");
const repository = require("../repositories/user.repository");
const authService = require("../services/auth.service");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
  async index(req, res) {
    try {
      var users = await repository.fetch();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async store(req, res) {
    try {
      const { name, document, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(200).send({ message: "As senhas não são iguais", sucess: false });
      }

      ApiValidation.isFixedLen(document, 11, "Documento deve conter até 11 caracteres");

      if (!ApiValidation.isValid)
        return res.status(200).send(ApiValidation.errors());

      const created = await repository.register({ name, document, email, password });
      const payload = {
        name: created.name,
        email: created.email,
        document: created.document,
        id: created._id
      }

      return res.status(200).send({
        success: true, data: {
          token: authService.generateToken(payload),
          user: created
        }
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      await repository.remove(req.params.id);
      return res.status(200).send({ success: true });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async authenticate(req, res) {
    try {
      const user = await repository.fetchByDocument(req.body.username);
      const passwordEqual = await bcrypt.compare(req.body.password, user.password);

      if (!passwordEqual) res.status(200).send({ message: "Senhas não são iguais" });

      const payload = {
        name: user.name,
        email: user.email,
        document: user.document,
        id: user._id
      }

      const token = await authService.generateToken(payload);

      res.status(200).send({
        success: true, data: {
          token,
          user
        }
      });

    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new UserController();
