const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8081;
const users = [];

/* App Set Views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* App Use */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'));
app.use('/', require('./routes/index'));


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`App listening on ${port}`);
});
