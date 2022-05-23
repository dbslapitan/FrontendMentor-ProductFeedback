const { response } = require('express');
const User = require('../model/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

module.exports.authenticateUser = (req, res, next) => {
  User.findOne({username: req.body.username})
  .then(response => {
    if(response){
      const SECRET = process.env.SECRET;
      bcrypt.compare(req.body.password, response.password).then(match => {
        const token = jwt.sign({username: response.username, name: response.name}, SECRET, {expiresIn: "2h"});
        return res.status(200).json({
          success: true,
          data: {
            userId: response._id,
            username: response.username,
            name: response.name,
            token: token
          }
        });
      })
    }  
    else{
      return res.status(200).json({
        success: false,
        data: {}
      });
    }
  })
  .catch(error => {
    return res.status(404).json({
      success: false,
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