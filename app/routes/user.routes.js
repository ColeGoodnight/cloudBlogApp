const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth.middleware');
const userControllers = require('../controllers/users.controllers');
const passport = require('passport')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));

// https://itswagi.medium.com/how-to-get-started-with-express-sequelize-and-passport-cc405391a3de
router.post('/logout', userControllers.userLogout);

router.post('/login', checkAuth.authenticateUserMiddleware, function(req, res) {
	res.redirect('/post/');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/register', function(req, res) {
	res.render('register', {
		title: 'Register'
	});
});


router.post(
	'/register',
	body('username', 'Username field cannot be empty.').notEmpty(),
	body('username', 'Username must be between 5-15 characters long.').isLength({ min: 5, max: 15 }),
	body('passwordMatch', 'Passwords do not match, please enter matching passwords.').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}
		// Indicates the success of this synchronous custom validator
		return true;
	}),
	passport.authenticate('local-signup', {
		successRedirect: '/post',
		failureRedirect: '/register'
	})
	
	/*function(req, res, next) {
		console.log('entered post function')
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.redirect('user/register'); }
			passport.authenticate('local')(req, res, function () {
				res.redirect('/post');
			});
		})
	}*/
    //userControllers.userRegister
);

module.exports = router