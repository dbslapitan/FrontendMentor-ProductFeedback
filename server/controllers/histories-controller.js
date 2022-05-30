const History = require('../model/history-model');

module.exports.getAllHistory = (req, res, next) => {
  History.find().then(response => {
    res.status(200).json({
      success: true,
      data: response
    });
  });
};

module.exports.getHistory = (req, res, next) => {
  History.findOne({userId: req.params.id}).then(history => {
    if(history){
      res.status(200).json({
        success: true,
        data: history
      });
    }
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: error
    });
  });
};

module.exports.updateHistory = (req, res, next) => {
  History.findByIdAndUpdate(req.body._id, req.body).then(response => {
    res.status(200).json({
      success: true,
      message: 'History successfully updated...'
    });
  })
  .catch(error => {
    res.status(500).json({
      success: false,
      message: 'Error Occured...'
    });
  });
};