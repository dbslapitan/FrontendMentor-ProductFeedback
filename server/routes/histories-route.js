const express = require('express');
const controller = require('../controllers/histories-controller');
const router = express.Router();

const checkAuth  = require('../controllers/check-auth');

router.route('/').get(controller.getAllHistory);

router.route('/:id').get(controller.getHistory).put(checkAuth, controller.updateHistory);

module.exports = router;
