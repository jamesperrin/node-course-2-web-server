const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// Partials
hbs.registerPartials(`${__dirname}/views/partials`);

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method}: ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

/**
 * Maintenance mode
 */
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

// Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

/**
 * Home Page
 */
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, you are welcome!'
  });
});

/**
 * About Page
 */
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

/**
 * Projects Page
 */
app.get('/projects', (req, res) => { 
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

/**
 * Bad response
 * /bad - send back json with errorMessage
 */
app.get('/bad', (req, res) => {
  res.send({
    'errorMessage': 'Unable to handle request'
  });
});

//  @see https://stackoverflow.com/questions/14322989/first-heroku-deploy-failed-error-code-h10
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})