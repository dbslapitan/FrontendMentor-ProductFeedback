const express = require('express');
const controller = require('../controllers/comments-controller');

const router = express.Router();

router.route('/').get(controller.getAllComments).post(controller.createComment).delete(controller.deleteComment);

router.route('/:id').get(controller.getComments).put(controller.editComment);

module.exports = router;