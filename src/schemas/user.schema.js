const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    document: {
      type: String,
      required: true,
      maxlength: 11
    },
    username: {
      type: String,
      required: true,
      maxlength: 11
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
UserSchema.pre("save", function (next) {
  if (this.password) {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
