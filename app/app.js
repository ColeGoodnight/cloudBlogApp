require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const compression = require ('compression');
const helmet = require('helmet');
const https= require("https");
const fs = require('fs')




const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
//const MongoStore = require('connect-mongo');
//const { Sequelize, DataTypes } = require('sequelize');
//const mongoSanitize = require('express-mongo-sanitize');


const User = require("./models/user");
const Post = require("./models/post")

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const { check } = require('express-validator');
const sequelize = require('./utils/database');


const app = express();

app.set('view engine', 'ejs');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
//app.use(mongoSanitize());
app.use(express.static('public'));

async function checkConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

  
app.set('trust proxy', 1); // trust first proxy

const port = config.get('port') || 3000;
const blogDB = config.get('db.name')

/*const blog_db_url =
	config.get('db.db_url') +
	config.get('db.password') +
	config.get('db.host') +
	blogDB +
	'?retryWrites=true&w=majority';*/

// test connection through sequelize
checkConnection();

// one to many relationship
User.hasMany(Post);

// create tables in db
sequelize
	.sync()
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});

// old connection test
/*const dbConnection = mongoose.connect(blog_db_url, (err) => {
  if(err){
    console.log(err)
  }
});*/



app.use(
	session({
		secret: config.get('secret'),
		resave: false,
    //store: MongoStore.create({
      //mongoUrl: blog_db_url,
     // ttl: 2 * 24 * 60 * 60
    //}),
		saveUninitialized: false,
		cookie: { secure: 'auto' }
	})
);



app.use(passport.initialize());
app.use(passport.session());

/*
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.use(function(req, res, next) {
	res.locals.isAuthenticated=req.isAuthenticated();
	next();
});
*/

app.use('/user', userRouter);

app.use('/post', postRouter);

app.all('*', function(req, res) {
  res.redirect("/post/about");
});

const server = https.createServer({
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
}, app).listen(port,() => {
console.log('Listening ...Server started on port ' + port);
})

module.exports = app;