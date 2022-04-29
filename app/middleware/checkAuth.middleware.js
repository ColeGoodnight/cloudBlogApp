
const passport = require('passport');


const isAuthenticatedMiddleware = (req, res, next) => {
	console.log('auth middleware entered');
	if (req.isAuthenticated()) {
		console.log('user authenticated');
		return next();
	} else {
		console.log('user redirected to login - user not authenticated');
		res.redirect('/user/login');
	}
};

const authenticateUserMiddleware = (req,res) => {
	console.log("attempting login");
	console.log(req.body.password)
	console.log(req.body.email)
	passport.authenticate('local-signin', function(temp, user, message) {
		if (user) {
			req.login(user, function(err) {
				if (err) { return next(err); };
			});
			res.redirect('/post');
			console.log('user redirected to post - login success')
		} else {
			console.log('auth failed')
			console.log(message.message)
			res.redirect('/user/login');
		}
		
  	})(req, req.body.email,req.body.password, function(temp, user) {});
  	console.log("login happened");
}

module.exports = {
	isAuthenticatedMiddleware,
	authenticateUserMiddleware,
};
