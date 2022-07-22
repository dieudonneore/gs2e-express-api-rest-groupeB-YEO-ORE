const jwt = require("jsonwebtoken");
const UserModel = require('../users/models/user.model')
const Config = require('../../utils/config')

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jwt.verify(req.headers.authorization.split(' ')[1], Config.apiSecret, function (err, decode) {
        if (err) req.user = undefined;
        UserModel.findOne({
            _id: decode.id
          })
          .exec((err, user) => {
            if (err) {
              res.status(500)
                .send({
                  message: err
                });
            } else {
              req.user = user;
              next();
            }
          })
      });
    } else {
      req.user = undefined;
      next();
    }
  };


module.exports = verifyToken