// // var jwt=require('jsonwebtoken');

// // var token = jwt.sign({ id: 10 }, 'somesecret');

// // var decoded = jwt.verify(token, 'fhgfhg');

// // console.log(decoded);


// // new Promise((res, rej) => {
// //   res(10);
// // })

// //   .then((num) => {
// //     return 10;
// //   }).then(result => {
// //     console.log(result);
// //   });


// // var bcrypt = require('bcrypt');


// // bcrypt.genSalt(10, (err, salt) => {
// //   bcrypt.hash("103020", salt, (err, encrypted) => {
// //     console.log(encrypted);
// //   })
// // })

// const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema({
//   title: String,
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   comments: [{
//     text: String,
//     postedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }
//   }]

// }, {
//   toObject: {
//     transform: function (doc, ret) {
//       delete ret._id;
//     }
//   },
//   toJSON: {
//     transform: function (doc, ret) {
//       delete ret._id;
//     }
//   }
//   });

// var Post = mongoose.model('Post', PostSchema);

// var post = new Post({
//   title: 'test'
// });

// console.log(JSON.stringify(post))


// new require('mongoose').Schema({}, {

// })