const express = require('express');
const controller = require('../controllers/users-controller');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const checkAuth  = require('../controllers/check-auth');

router.route('/')
.get(controller.getAllUser)
.post(upload.single('image'), controller.createUser)
.delete(checkAuth, controller.deleteUser);

router.route('/check/:username').get(controller.checkUser);

router.route('/login').post(controller.authenticateUser);

module.exports = router;
