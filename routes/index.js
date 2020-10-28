const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth')
const generateToken = require('../util/token')
const faker = require('faker')

//Uses a custom response body function
var customAuth = basicAuth({
    users: { 'Admin': 'secret1234' },
    unauthorizedResponse: getUnauthorizedResponse
})

function getUnauthorizedResponse(req) {
  return req.auth
    ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
    : 'No credentials provided'
}

/* Routes */
router.get('/', (req, res) => {
  res.render('index');
})

/* Example with Basic Auth */
router.get('/auth', customAuth, (req, res) => {
  res.status(200).send('You passed! Your token: '+generateToken(15));
})

router.get("/data", function (req, res) {
  var data = ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email()
  });
  res.status(200).send(data);
});

router.get("/error", function (req, res) {
  res.status(500).send("Not Found");
});

module.exports = router;
