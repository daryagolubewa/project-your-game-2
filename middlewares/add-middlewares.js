'use strict';
const models = require('./../models/index')
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function addMiddlewares(router) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            console.log('Inside local strategy callback');
            // here is where you make a call to the database
            // to find the user based on their username or email address
            const foundUsers = await models.users.giveEmail(email);
            // no user was found
            if(foundUsers.length === 0) {
                return done(400, 'Error. Email not found!');
            } else {
                if(bcrypt.compareSync(password, foundUsers[0].password)) {
                    // success
                    console.log('Local strategy returned true');
                    return done(null, foundUsers[0]);
                } else {
                    return done(400, 'Error. Password not correct!');
                }
            }
        }
    ));
    
    router.use(bodyParser.urlencoded({ extended: false })); // Form data
    router.use(bodyParser.json()); // JSON
    router.use(session({
        genid: (req) => {
            console.log('Inside the session middleware');
            console.log(req.sessionID);
            return uuid(); // use UUIDs for session IDs
        },
        store: new FileStore(),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 10*60*1000 }
    }));
    router.use(passport.initialize());
    router.use(passport.session());
    // tell passport how to serialize the user
    passport.serializeUser((user, done) => {
        const currentUser = {
          nickname: user.nickname,
          id: user.id,
          email: user.email
        }
        done(null, currentUser);
    });
     passport.deserializeUser( async (user, done) => {
        // let users = await models.users.findByPk(id)
        // let user
        //   if(users.id === id) {
        //     user = users
        //   }
        //   else {
        //     user = false
        //   }    
        done(null, user);
    });
}

module.exports = addMiddlewares