const User = require("../schemas/user.schema");

class UserRepository {
  async fetch() {
    return await User.find({});
  }

  async fetchByDocument(document) {
    return await User.findOne({ document: document });
  }

  async fetchByEmail(email) {
    return await User.find({ email: email });
  }

  async register(model) {
    var user = await User.create({
      name: model.name,
      username: model.document,
      document: model.document,
      email: model.email,
      password: model.password
    });

    return user;
  }

  async remove(id) {
    await User.findByIdAndRemove(id);
  }

  async authenticate(data) {
    const response = await User.findOne({
      username: data.username,
      password: data.password
    });

    return response;
  }
}

module.exports = new UserRepository();
