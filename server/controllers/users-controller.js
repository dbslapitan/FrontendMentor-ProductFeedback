const User = require('../model/users-model');

module.exports.getUser = (req, res, next) => {
  User.find().then(users => {
    res.status(200).json({
      status: "success",
      message: users
    });
  }).catch(error => {
    res.status(200).json({
      status: "success",
      message: error
    });
  });
  
};

module.exports.createUser = (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json({
      status: "success",
      message: user
    })
  }).catch(error => {
      res.status(404).json({
        status: "fail",
        message: error
      })
    });;
};

module.exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.body.id)
  .then(user => {
    res.status(201).json({
      status: "success",
      message: user
    })
  }).catch(error => {
      res.status(404).json({
        status: "fail",
        message: error
      })
    });
};