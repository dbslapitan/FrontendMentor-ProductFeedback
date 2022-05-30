const Feedback = require('../model/feedbacks-model');
const Comment = require('../model/comments-model');
const { deleteModel } = require('mongoose');


module.exports.getAllFeedback = async (req, res, next) => {
  const feedbacks = await Feedback.find().exec().then(feedbacks => feedbacks);
  let newFeedbacks = feedbacks.map(async feedback => {
    let newFeedback = {...feedback};
    newFeedback = {...newFeedback._doc}
    let comments = await Comment.find({feedbackId: feedback._id}).exec().then(comments => comments);
    let commentCount = 0;
    comments.forEach(comment => {
      commentCount += 1;
      commentCount += comment.replies.length;
    });
    newFeedback.comments = commentCount;
    return newFeedback;
  });
  Promise.all(newFeedbacks).then(response => {
    res.status(200).json({
      success: true,
      data: response
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error
    });
  });
};

module.exports.createFeedback = (req, res, next) => {
  Feedback.create(req.body)
  .then(feedback => {
    res.status(201).json({
      success: true,
      message: "Feedback has been successfully created."
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error
    });
  });
};

module.exports.deleteFeedback = async (req, res, next) => {

  Feedback.findByIdAndDelete(req.params.id)
  .then(user => {
    Comment.deleteMany({feedbackId: req.params.id}).then(response => {
      res.status(201).json({
        status: "success",
        message: 'Feedback successfully deleted...'
      })
    })
  }).catch(error => {
      res.status(404).json({
        status: "fail",
        message: 'Unable to delete feedback...'
      })
    });
};

module.exports.getSingleFeedback = (req, res, next) => {
  Feedback.findById(req.params.id).then(response => {
    if(response){
      res.status(200).json({
        success: true,
        data: response
      });
    }
    else{
      res.status(200).json({
        success: false,
        data: response
      });
    }
    
  })
  .catch(error => {
    res.status(404).json({
      success: false,
      data: error
    });
  });
};

module.exports.editUpvote = (req, res, next) => {
  Feedback.findByIdAndUpdate(req.body._id, {upvotes: req.body.upvotes}).then(response => {
      res.status(200).json({
        success: true,
        message: `${response._id} has been successfully updated...`
      });
  }).catch(error => {
    res.status(404).json({
      success: true,
      message: `Error occured...`
    });
  });
};

module.exports.editFeedback = (req, res, next) => {
  console.log(req.body);
  Feedback.findByIdAndUpdate(req.body._id, req.body).then(response => {
      res.status(200).json({
        success: true,
        message: `${response._id} has been successfully updated...`
      });
  }).catch(error => {
    res.status(404).json({
      success: true,
      message: `Error occured...`
    });
  });
};