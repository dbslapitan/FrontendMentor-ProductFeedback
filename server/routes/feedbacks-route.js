const express = require('express');
const controller = require('../controllers/feedbacks-controller');
const router = express.Router();

const checkAuth  = require('../controllers/check-auth');

router.route('/')
.get(controller.getAllFeedback)
.post(controller.createFeedback);

router.route('/:id').get(controller.getSingleFeedback).delete(controller.deleteFeedback);

router.route('/edit/:id').post(checkAuth, controller.editUpvote).put(checkAuth, controller.editFeedback);

module.exports = router;