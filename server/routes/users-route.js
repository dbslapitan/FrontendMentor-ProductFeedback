const express = require('express');
const controller = require('../controllers/users-controller');
const router = express.Router();

router.route('/')
.get(controller.getUser)
.post(controller.createUser)
.delete(controller.deleteUser);

module.exports = router;
