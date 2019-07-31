const mongoose = require("mongoose");
const md5 = require("md5");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    document: {
      type: String,
      required: true,
      maxlength: 11,
      index: {
        unique: true
      }
    },
    username: {
      type: String,
      required: true,
      maxlength: 11,
      index: {
        unique: true
      }
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
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

UserSchema.pre("save", function(next) {
  if (this.password) {
    this.password = md5(this.password + process.env.SECRET);
  }

  next();
});

module.exports = mongoose.model("User", UserSchema);
