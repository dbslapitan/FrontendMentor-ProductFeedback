const Comment = require('../model/comments-model');
const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region :process.env.REGION
});

module.exports.createComment = (req, res, next) => {
  Comment.create(req.body).then(response => {
    if(response){
      res.status(201).json({
        success: true,
        message: 'Comment submitted...'
      });
    }
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: error
    });
  });
};

module.exports.getAllComments = (req, res, next) => {
  Comment.find().then(response => {
    res.status(200).json({
      success: true,
      data: response
    });
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: error
    });
  });;
};

module.exports.getComments = (req, res, next) => {
  Comment.find({feedbackId: req.params.id}).then(response => {

    let newResponse = response.map(comment => {
      let newComment = {...comment._doc};
      newComment.imageUrl = s3Client.getSignedUrl('getObject', {Bucket: process.env.BUCKET, Key: comment.userId + comment.extension});
      newComment.replies = newComment.replies.map(reply => {
        let newReply = {...reply._doc};
        newReply.imageUrl = s3Client.getSignedUrl('getObject', {Bucket: process.env.BUCKET, Key: reply.userId + reply.extension});
        return newReply;
      });
      return newComment;
    });

    res.status(200).json({
      success: true,
      data: newResponse
    });
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: error
    });
  });;
};

module.exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndDelete(req.body.id).then(response => {
    if(response){
      res.status(201).json({
        success: true,
        message: 'Successfully deleted...'
      });
    }
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: error
    });
  });;
};

module.exports.editComment = (req, res, next) => {
  Comment.findByIdAndUpdate(req.body._id, req.body).then(response => {
    if(response){
      res.status(201).json({
        success: true,
        message: 'Reply successfully updated...'
      });
    }
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: error
    });
  });;
};