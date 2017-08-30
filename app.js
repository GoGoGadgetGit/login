const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({ extend: true }));

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

const users = [
  {username: "randy", password: "123"},
  {username: "pickle", password: "543"},
  {username: "hack", password: "ppp"}
]

server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');


server.get('/', function (req, res) {
  if (req.session.user !== undefined){
    res.render('home', {
      users: req.session.user.username
    });
  } else {
    res.redirect('/login')
  }

});

server.get('/login', function (req, res) {
  res.render('login');
})

server.post('/login', function (req, res) {
  for (let i = 0; i < users.length; i++){
    if(users[i].username === req.body.username && users[i].password === req.body.password){
      req.session.user = users[i]
      res.redirect('/')
    }
  }
  res.redirect('/login')
});

server.listen(3000, function () {
  console.log('Do ya thang')
});
