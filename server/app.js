var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const authjwt = require('./auth')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var filmRouter = require('./routes/film');
var hallsRouter = require('./routes/halls');
var jwtValidateRouter = require('./routes/jwtValidate');

var app = express();

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/film', [authjwt.verifyToken], filmRouter);
app.use('/halls', [authjwt.verifyToken], hallsRouter);
app.use('/validatetoken', /*[authjwt.verifyToken]*/ jwtValidateRouter);

module.exports = app;