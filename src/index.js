const express = require("express"),
    database = require('./database'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash');

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecrectapp',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Global Varibles
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');

  next();
})

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
