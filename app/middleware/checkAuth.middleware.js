
const passport = require('passport');
const user = require('./../models/user')


const isAuthenticatedMiddleware = (req, res, next) => {
	console.log('auth middleware entered');
	if (req.isAuthenticated() || req.app.get('user')) {
		console.log('user authenticated');
		return next();
	} else {
		console.log('user redirected to login - user not authenticated');
		res.redirect('/user/login');
	}
};

const authenticateUserMiddleware = (req,res) => {
	console.log("attempting login");
	passport.authenticate('local-signin', { failureRedirect: '/user/login' })(req,res, function() {
	req.app.set('user', true);
	res.redirect('/post');
	console.log('user redirected to post - login success')
  });
  //res.session.passport.user = true;
  //console.log("login successful");
}

module.exports = {
	isAuthenticatedMiddleware,
	authenticateUserMiddleware,
};
