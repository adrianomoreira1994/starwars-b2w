const jwt = require('jsonwebtoken');

class AuthService {
  generateToken(data) {
    return jwt.sign(data, process.env.SECRET, { expiresIn: '1d' });
  }

  async decodeToken(token) {
    var data = await jwt.verify(token, process.env.SECRET);
    return data;
  }

  authorize(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).json({ message: 'Acesso Restrito' });
    } else {
      jwt.verify(token, process.env.SECRET, function (error, decoded) {
        if (error) {
          res.status(401).json({
            message: 'Token Inválido'
          });
        } else {
          next();
        }
      });
    }
  };

  isAdmin(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).json({
        message: 'Token Inválido'
      });
    } else {
      jwt.verify(token, process.env.SECRET, function (error, decoded) {
        if (error) {
          res.status(401).json({
            message: 'Token Inválido'
          });
        } else {
          if (decoded.roles.includes('admin')) {
            next();
          } else {
            res.status(403).json({
              message: 'Esta funcionalidade é restrita para administradores'
            });
          }
        }
      });
    }
  };
}

module.exports = new AuthService();