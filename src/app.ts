import './env';
import {type Request, type Response, type NextFunction} from 'express';

import {AppDataSource} from './AppDataSource';

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');

// connect to db
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/kakaoAuthRouter');
const planRouter = require('./routes/planRouter');
const usersRouter = require('./routes/userRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/kakao', authRouter);
app.use('/plans', planRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status !== null ? (err.status as number) : 500);
  res.render('error');
});

app.use(cors());

module.exports = app;
