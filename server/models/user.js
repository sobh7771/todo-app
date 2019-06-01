/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable newline-after-var */
/* eslint-disable arrow-body-style */
/* eslint-disable sort-keys */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-this */
var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    trim: true,
    type: String,
    unique: true,
    validate: [
      validator.isEmail,
      '{VALUE} is not a valid email.'
    ]
  },
  password: {
    minlength: 6,
    required: 'You should provide a password',
    trim: true,
    type: String
  },
  tokens: [
    {
      token: {
        required: true,
        type: String
      },
      type: {
        required: true,
        type: String
      }
    }
  ]
}, {
    toJSON: {
      transform (doc, ret) {
        return {
          _id: ret._id,
          email: ret.email
        };
      }
    }
});

UserSchema.statics.findByCredentials = function (email, password) {
  // this=User

  return this.findOne({ email }).then(user => {

    // if (!user) {
      
    // }
    // do NOT use sync code as much as possible
    // var bool = bcrypt.compareSync(password, user.password);
    // console.log(bool);
    // if (bool) {
    //   return user;
    // }

    // return Promise.reject();

    return new Promise((reslove, reject) => {
      bcrypt.compare(password, user.password, (err, bool) => {
        if (bool) {
          return reslove(user);
        }

        reject();
      })
    });
  });
};

// eslint-disable-next-line func-names
// eslint-disable-next-line func-names
UserSchema.methods.createAuthToken = function () {
  var user = this;
  var type = 'auth';

  var token = jwt.sign({
    type,
    id: user._id
  }, 'abc123!');


  // user.tokens.push({
  //   type,
  //   token
  // });

  // return user.save().then(() => {
    return token;
  // });
};

UserSchema.pre('save', function (next) {
  // console.log(this.isModified('password'))
  if (this.isModified('password')) {

    bcrypt.hash(this.password, 10, (err, encrypted) => {
      this.password = encrypted;
      next();
    });

  } else {
    // eslint-disable-next-line callback-return
    next();
  }

})

module.exports = mongoose.model('User', UserSchema);