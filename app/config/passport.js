const User = require('./../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy(async function(usern, pass, done) {
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
});