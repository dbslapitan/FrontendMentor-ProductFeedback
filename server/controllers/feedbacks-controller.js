const Feedback = require('../model/feedbacks-model');

module.exports.getAllFeedback = (req, res, next) => {
  Feedback.find().then(feedbacks => {
    res.status(200).json({
      success: true,
      data: feedbacks
    });
  }).catch(error => {
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

module.exports.deleteFeedback = (req, res, next) => {
  Feedback.findByIdAndDelete(req.body.id)
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

module.exports.getSingleFeedback = (req, res, next) => {
  Feedback.findById(req.params.id).then(response => {
    res.status(200).json({
      success: true,
      data: response
    });
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