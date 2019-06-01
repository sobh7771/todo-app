var mongoose = require('mongoose');

var
  ops = {
    useFindAndModify: false,
    useNewUrlParser: true
  },
  uri = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(uri, ops);