const express = require('express');
const controller = require('../controllers/feedbacks-controller');
const router = express.Router();

router.route('/')
.get(controller.getAllFeedback)
.post(controller.createFeedback)
.delete(controller.deleteFeedback);

module.exports = router;