const User = require('../models/user');
const passport = require('passport');
const { body, validationResult } = require('express-validator');



const userLogout = (req, res, next) => {
    console.log('logout processed');
    req.session.destroy();
    req.logout();
    res.redirect('/post/about');
};

// register user
const userRegister = (req, res, next) => {
    // validates from express
    const errors = validationResult(req);

    // returns any errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // get username, email, pass from user input form
    const input_username = req.body.username;
    const input_email = req.body.email;
    const input_password = req.body.password;

    console.log(input_username);

    // check if username exists
    const userExists = User.findOne({ where: {username: input_username }})
        .then(token => token !== null)
        .then(isUnique => isUnique);

    // check if email exists
    const emailExists = User.findOne({ where: {email: input_email }})
        .then(token => token !== null)
        .then(isUnique => isUnique);

    console.log(userExists);

    // if user or email exists, redirect back to registration
    if (userExists != null || emailExists != null) {
        console.log('User or email exists');
        res.redirect('register');
    } else {
    // otherwise create new user and register, if there is an error redirect to register
        console.log(input_email, input_password, input_username);
        User.Create({ email: req.body.email, username: req.body.username });
        User.register(newUser, input_password, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect('/user/register');
            } else {
                // otherwise authenticate and redirect to post page
                passport.authenticate('local')(req, res, function () {
                    res.redirect('/post');
                });
            }
        });
    }
};

module.exports = {
    userRegister,
    userLogout
};
