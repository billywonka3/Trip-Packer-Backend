require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const passport     = require('passport');
const session      = require('express-session');

require('./config/passport-config');


mongoose.Promise = Promise;
mongoose
  // .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .connect('mongodb://localhost/express-backend', {useNewUrlParser: true})
  .then(() => {
    console.log(`Connected to Mongo! `)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));


// default value for title local
// app.locals.title = 'Trip-Packer : Take the First Step on a new Journey';


app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: 
  [
    'http://localhost:3000', 
    'https://trip-packer.herokuapp.com'
  ]
}));


// ================ ROUTES ==================
const userRoutes = require('./routes/userRoutes');
app.use('/api/auth', userRoutes);

const tripRoutes = require('./routes/tripRoutes');
app.use('/api/trips', tripRoutes);

const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

const toiletriesRoutes = require('./routes/toiletriesRoutes');
app.use('/api/toiletries', toiletriesRoutes);

const electronicsRoutes = require('./routes/electronicsRoutes');
app.use('/api/electronics', electronicsRoutes);

// ==========================================

module.exports = app;

