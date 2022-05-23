const express = require('express');
const controller = require('../controllers/feedbacks-controller');
const router = express.Router();

router.route('/')
.get(controller.getAllFeedback)
.post(controller.createFeedback)
.delete(controller.deleteFeedback);

router.route('/edit/:id').post(controller.editSingleFeedback);

module.exports = router;