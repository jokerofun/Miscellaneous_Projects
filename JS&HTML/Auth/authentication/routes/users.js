var express = require('express');
var router = express.Router();

/* GET users listing. */
router
.get('/login', function(req, res, next) {
  res.render('login');
})
.post('/login', (req,res)=>{
const { email,password} =req.body;

if(email === 'pesho@gmail.com' && password==='pesho123'){
  req.session.user = {email};
  res.send('You made it champ');
}else{
  res.status(401).send('Nope');
}
})
.get('/profile', (req,res)=>{
  const {user} =req.session;

  if(user){
res.render('profile');
  }else{
    res.redirect('/users/login');
  }
});

module.exports = router;
