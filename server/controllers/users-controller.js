const { response } = require('express');
const User = require('../model/users-model');

module.exports.getAllUser = (req, res, next) => {
  User.find().then(users => {
    res.status(200).json({
      status: "success",
      data: users
    });
  }).catch(error => {
    res.status(200).json({
      success: true,
      data: error
    });
  });
  
};

module.exports.checkUser = (req, res, next) => {
  let username = req.params.username;
  User.findOne({username: username}).then(response => {
    console.log(response);
    res.status(200).json({
      isFound: response ? true : false
    });
  }).catch(error => {
    console.log('error');
    res.status(404).json({
      success: false,
      data: error
    });
  });
    
  
}

module.exports.createUser = (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json({
      status: "success",
      data: user
    })
  }).catch(error => {
      res.status(404).json({
        status: "fail",
        data: error
      });
    });
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