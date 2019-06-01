/* eslint-disable no-underscore-dangle */
var express = require('express');
// eslint-disable-next-line id-length
var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;

require('./db/mongoose');
var Todo = require('./models/todo');
var User = require('./models/user');
var authenticate = require('./middleware/authenticate');

var app = express();

app.use(express.json());

app.route('/todos')
  .post(authenticate, (req, res) => {
    var { text } = _.pick(req.body, ['text']);

    // console.log(req.user._id);

    var todo = new Todo({
      text,
      _creator: req.user._id
    });

    todo.save()
      .then(user => {
        res.send({ user });
      })
      .catch(err => {
        res.status(400).send(err);
      });

  })
  .get(authenticate, (req, res) => {

    Todo.find({
      _creator: req.user.id
    }).then(todos => {
      res.send({ todos });
    }).catch(err => {
      res.status(400).send(err);
    });

  });

app.route('/todos/:id')
  .get(authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findOne({
      _id: id,
      _creator: req.user.id
    }).then(todo => {
      if (!todo) return res.status(404).send();

      res.send({ todo });
    }).catch(() => {
      res.status(400).send();
    });
  })
  .patch(authenticate, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    
    if (!ObjectID.isValid(id)) return res.status(404).send();

    if (typeof body.completed === 'boolean' && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body = {
        completed: false,
        completedAt: null
      }
    }

    Todo.findOneAndUpdate({
      _id: id,
      _creator: req.user.id
    }, {
      $set: body
    }, { new: true }).then(todo => {
      if (!todo) return res.status(404).send();

      res.send({ todo });
    }).catch(() => {
      res.status(400).send();
    });
  })
  .delete(authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findOneAndDelete({
      _id: id,
      _creator: req.user.id
    }).then(todo => {
      if (!todo) return res.status(404).send();

      res.send({ todo });
    }).catch(() => {
      res.status(400).send();
    });
  });


app.post('/users', (req, res) => {
  var user = new User(req.body);

  user.save().then(user => {
    // res.send({ user });
    // user should create the token itself.
    var token = user.createAuthToken();
    
    res.header('x-auth', token).send({ user });

  }).catch(err => {
    res.status(400).send(err);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send({ user: req.user });
});

app.post('/users/login', (req, res) => {
  var { email, password } = _.pick(req.body, [
    'email',
    'password'
  ]);
  
  // find user by its credintials
  // console.log(email, password)
  User.findByCredentials(email, password).then(user => {
    var token = user.createAuthToken();

    res.header('x-auth', token).send({ user });
  }).catch(() => {
    res.status(400).send();
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 3000');
});