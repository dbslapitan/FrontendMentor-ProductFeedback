const User = require('../model/users-model');
const History = require('../model/history-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region :process.env.REGION
});

const MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/jpg': '.jpg'
};

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
  const user = {...req.body};
  user.extension = MIME[req.file.mimetype];
  const uploadParams = {
    Bucket: process.env.BUCKET, 
    Key: '', // pass key
    Body: req.file.buffer // pass file body
  };
  User.create(user)
  .then(user => {

    History.create({userId: user._id}).then(response => {
      if(response){
        uploadParams.Key = user._id + user.extension;

        s3Client.upload(uploadParams, (err, data) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: err
            });
          }
          res.status(201).json({
            success: "success",
            data: user
          });
        });
      }
    });

    
    }).catch(error => {
      console.log(error);
      res.status(404).json({
        success: "fail",
        data: error
      });
    });
};

module.exports.authenticateUser = (req, res, next) => {
  User.findOne({username: req.body.username})
  .then(response => {
    if(response){
      const presignedURL = s3Client.getSignedUrl('getObject', {Bucket: process.env.BUCKET, Key: response._id + response.extension});
      const SECRET = process.env.SECRET;
      bcrypt.compare(req.body.password, response.password).then(match => {
        
        console.log(match);
        if(match){
          const token = jwt.sign({username: response.username, name: response.name}, SECRET);
          return res.status(200).json({
            success: true,
            data: {
              userId: response._id,
              username: response.username,
              name: response.name,
              token: token,
              imageURL: presignedURL,
              extension: response.extension
            }
          });
        }
        return res.status(200).json({
          success: false,
          data: {
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
    console.log(error);
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