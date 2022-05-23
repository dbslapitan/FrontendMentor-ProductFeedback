const express = require('express');
const controller = require('../controllers/users-controller');
const router = express.Router();

router.route('/')
.get(controller.getAllUser)
.post(controller.createUser)
.delete(controller.deleteUser);

router.route('/check/:username').get(controller.checkUser);

router.route('/login').post(controller.authenticateUser);

module.exports = router;
