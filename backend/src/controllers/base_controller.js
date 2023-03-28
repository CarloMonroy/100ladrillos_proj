bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");

class baseController {
  async hashPassword(password) {
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
    return await hashedPassword;
  }

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
}

module.exports = baseController;
