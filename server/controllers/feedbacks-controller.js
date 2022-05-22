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