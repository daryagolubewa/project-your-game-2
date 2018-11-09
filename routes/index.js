const models = require('./../models/index')
const bcrypt = require('bcrypt');
const express = require('express');

const passport = require('passport');
const addMiddlewares = require('../middlewares/add-middlewares');
const userRes = require('../helpers/func')


const router = express.Router();
addMiddlewares(router);
const saltRounds = 10;

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

router.get('/user/profile', async (req,res) => {
  let userResult = await userRes(req)
  res.render('profile', {userName: userResult.nickname, userScore: userResult.score})
})
 // GET home page. 
router.get('/', async function(req, res, next) {

  let userResult = await userRes(req)
  res.render('index', { title: 'Home', userName: userResult.nickname});

});

module.exports = router;