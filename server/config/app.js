const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Database
const DB = process.env.DATABASE;

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log("Connected to MongoDB..."); });

//Routes
const usersRouter = require('../routes/users-route');
const feedbacksRouter = require('../routes/feedbacks-route');
const commentsRouter = require('../routes/comments-route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', usersRouter);
app.use('api/v1/feedbacks', feedbacksRouter);
app.use('api/v1/comments', commentsRouter);

module.exports = app;
