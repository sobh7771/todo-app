var User = require('../models/user');
var jwt = require('jsonwebtoken');

// eslint-disable-next-line func-names
module.exports = function (req, res, next) {
  // eslint-disable-next-line consistent-this
  var token = req.headers['x-auth'];

  try {

    // eslint-disable-next-line no-undef
    var decoded = jwt.verify(token, 'abc123!');
    
    // console.log(decoded);
    User.findById(decoded.id).then(user => {

      req.user = user;
      // req.token = token;
      
      next();

    }).catch(() => {
      
      res.status(400).send();
      
    });

  } catch (err) {
    res.status(401).send();
  }
};