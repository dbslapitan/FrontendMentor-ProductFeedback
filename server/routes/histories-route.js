const express = require('express');
const controller = require('../controllers/histories-controller');
const router = express.Router();

router.route('/').get(controller.getAllHistory);

router.route('/:id').get(controller.getHistory).put(controller.updateHistory);

module.exports = router;
