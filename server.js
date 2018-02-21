const express = require('express');
const hbs = require('hbs');

var app = express();
const currentYear = new Date().getFullYear();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, your welcome!',
    currentYear: currentYear
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: currentYear
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    'errorMessage': 'Unable to handle request'
  });
});

app.listen(3000, () => { 
  console.log(`Server is up on port 3000`);
});