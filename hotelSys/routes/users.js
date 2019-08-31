var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotelSys');
var User = require('../models/users');


router.get('/login', function(req, res, next){
  res.render('login', { title: 'About - hotelSys'});
});

//Get all users
router.get('/', function(req,res,next){
 User.find({}, function(err, users){
    if(err){
      res.send('Error');
      next();
    }
    res.json(users);
    
  });
});

//Delete user by ID
router.delete('/:id', function(req,res){
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
      if(!doc){ return res.status(404).end();}
      return res.send("Record Deleted");
    })
    .catch(err => next(err));
});

//Post - register new user
router.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.firstname = firstname;
  newuser.lastname = lastname;
  newuser.save(function(err, savedUser){
      if(err){
          console.log(err);
          return res.status(500).send();
      }

      return res.status(200).send();
  });
});

module.exports = router;
