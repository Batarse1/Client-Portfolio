var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var database = require('./config/database');

database();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/user/UserRoutes');
const customerRoutes = require('./routes/customer/CustomerRoutes');
const policyRoutes = require('./routes/policy/PolicyRoutes');
const insuredRoutes = require('./routes/insured/InsuredRoutes');

app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/policies', policyRoutes);
app.use('/insured', insuredRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
