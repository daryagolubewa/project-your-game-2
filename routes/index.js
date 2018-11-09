const models = require('./../models/index')
const express = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
const saltRounds = 10;

 // configure passport.js to use the local strategy
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
    console.log('Inside serializeUser callback. User id is save to the session file store here');
    done(null, user.id);
});
 passport.deserializeUser( async (id, done) => {
    let users = await models.users.giveId(id)
    let user
    if(users.length === 0) {
      user = false
    }
    else {
      if(users[0].id === id) {
        user = users[0]
      }
      else {
        user = false
      }
    }
    done(null, user);
});

//GET login form
router.get('/user/login', (req, res, next) => {
  res.render('users/login')
})  

//POST login 
 router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.send(err);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.send('500', err);
            }
            return res.json(user)
        })
    })(req, res, next);
});
// GET registration form
 router.get('/user/registration', (req, res) => {
  res.render('users/registration')
})
// POST new user
 router.post('/user/create', async (req,res) => {
   let curEmail = await models.users.giveEmail(req.param('email'))
   if(curEmail.length === 0) {
      models.users.create({"nickname": req.param("nickname"), "email": req.param("email"), "password": bcrypt.hashSync(req.param("password"), saltRounds)})
      res.send('dfdf')
   }
   else {
     res.send(400, 'This email is already used')
   }   
})
// get user log out
router.get('/user/logout', (req,res)=> {
    req.logout();
  res.redirect('/')
})

 // GET home page. 
router.get('/', async function(req, res, next) {
    let isEmpty = (myObject) => {
        for(var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                return false;
            }
        }    
        return true;
    }
    let userName
    if((req.session.passport != undefined) && !isEmpty(req.session.passport)) {
        userName = await models.users.giveId(req.session.passport.user)
        userName = userName[0].nickname
    }
    else {
        userName = false
    }
  res.render('index', { title: 'Home', userName});
});
 module.exports = router;
