var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
  completed: {
    default: false,
    type: Boolean
  },
  completedAt: {
    default: null,
    type: Number
  },
  text: {
    minlength: 1,
    required: true,
    trim: true,
    type: String
  },
  _creator: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId
  }
});