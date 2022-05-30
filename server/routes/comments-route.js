const express = require('express');
const controller = require('../controllers/comments-controller');

const checkAuth  = require('../controllers/check-auth');

const router = express.Router();

router.route('/').get(controller.getAllComments).post(checkAuth, controller.createComment).delete(checkAuth, controller.deleteComment);

router.route('/:id').get(controller.getComments).put(checkAuth, controller.editComment);

module.exports = router;