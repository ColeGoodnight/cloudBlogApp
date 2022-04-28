//const User = require('./../models/user')
const passport = require('passport')
const { Op } = require('sequelize');
// const LocalStrategy = require('passport-local').Strategy
var bCrypt = require('bcrypt');
const User = require('./../models/user')


/*passport.use(new LocalStrategy(async function(usern, pass, done) {
      try{
        const user = await User.findOne({where: { username: usern }})
        if (!user){
            return done(null, false, { message: 'Username not found' }) 
        }
        const passVal = user.validPassword(pass)
        if(!passVal){
            return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user);
      } catch(error) {
          return done(error)
      }
  }
  ))
    
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) { done(null, user); });
});*/

module.exports = function(user) {
 
    //var User = user;
 
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'username',
            emailField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
 
        },
 
 
 
        function(req, eemail, ppassword, done) {

            console.log('entered interior function')
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
 
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
 
            User.findOne({
                where: {
                    [Op.or]: [
                        {email: email},
                        {username: username},
                    ],
                }
            }).then(function(user) {
                
                console.log(user)
                if (user) {
                    console.log('That email or username is already taken')
                    // need to figure out how to redirect to register from here 
                    // - res is not what it should be
                    return done(null, false)
                } else {
                    
                    console.log(password)
                    var userPassword = generateHash(password);
 
                    var data = {
                            email: email,
                            password: userPassword,
                            username: username
                        };
 
                    User.create(data).then(function(newUser, created) {
                        if (newUser) {
                            return done(null, newUser)
                        } else {
                            console.log("Something went wrong");
                            return done(null, false)
                        }
                    });
                }
            });
        }
    ));
}

passport.serializeUser(function(user, done) {
 
    done(null, user.id);
 
});

passport.deserializeUser(function(id, done) {
 
    User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});