bcrypt = require("bcrypt");

class baseController {
  async hashPassword(password) {
    salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = baseController;
