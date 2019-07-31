const ApiValidation = require("../validators/api.validator");
const repository = require("../repositories/user.repository");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

class UserController {
  async index(req, res) {
    try {
      var users = await repository.fetch();

      if (!users.length)
        return res
          .status(404)
          .send({ message: "Nenhum usuário encontrado", success: false });

      return res.status(200).send({ data: users, success: true });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async store(req, res) {
    try {
      const { name, document, email, password, confirmPassword } = req.body;

      const validation = new ApiValidation();
      validation.isNotEquals(
        password,
        confirmPassword,
        "As senhas devem ser iguais"
      );

      validation.isFixedLen(
        document,
        11,
        "Documento deve conter até 11 caracteres"
      );

      validation.isCpf(document, "Forneça um CPF válido");

      if (await repository.fetchByDocument(document))
        return res.status(400).send({
          success: false,
          message: "Este documento já está cadastrado"
        });

      if (!validation.isValid()) {
        return res.status(400).send(validation.errors());
      }

      const user = await repository.register({
        name,
        document,
        email,
        password
      });

      const token = authService.generateToken({
        name: user.name,
        email: user.email,
        document: user.document,
        id: user._id
      });

      return res.status(201).send({
        success: true,
        data: { token, user }
      });
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao processoar sua requisição. " + error,
        success: false
      });
    }
  }

  async delete(req, res) {
    try {
      await repository.remove(req.params.id);
      return res.status(200).send({ success: true });
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao processoar sua requisição. " + error,
        success: false
      });
    }
  }

  async authenticate(req, res) {
    try {
      const userAuthenticated = await repository.authenticate({
        username: req.body.username,
        password: md5(req.body.password + process.env.SECRET)
      });

      if (!userAuthenticated)
        res.status(404).send({
          success: false,
          message: "Oppss. Seu usuário ou senha está inválido"
        });

      const payload = {
        name: userAuthenticated.name,
        email: userAuthenticated.email,
        document: userAuthenticated.document,
        id: userAuthenticated._id
      };

      const token = await authService.generateToken(payload);
      res.status(200).send({ success: true, data: { token } });
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao processoar sua requisição. " + error,
        success: false
      });
    }
  }
}

module.exports = new UserController();
