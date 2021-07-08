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
  var csp = "script-src tag.wknd.ai assets.bounceexchange.com api.bounceexchange.com stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js https://code.jquery.com/jquery-3.5.1.min.js https://smart-tag.bounceexchange.com/dist/ijs_all_modules_dev.js dev.bounceexchange.com 'unsafe-inline' 'unsafe-eval'; \
  style-src assets.bounceexchange.com stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css 'unsafe-inline'; \
  img-src 'self' assets.bounceexchange.com events.bouncex.net dev.bounceexchange.com ssp.behave.com *.bidswitch.net ums.acuityplatform.com beacon.lynx.cognitivlabs.com odr.mookie1.com 'strict-dynamic'; \
  font-src assets.bounceexchange.com; \
  form-action api.bounceexchange.com; \
  connect-src events.bouncex.net https://coupons.bounceexchange.com https://*.cdnwidget.com https://*.cdnbasket.net dev.bounceexchange.com; \
  frame-src 'self'; \
  ";
  res.set("Content-Security-Policy", csp);
  res.render('index');
})

/* Example with Basic Auth */
router.get('/auth', customAuth, (req, res) => {
  res.status(200).send('You passed! Your token: '+generateToken(15));
})

router.get("/data", function (req, res) {
  console.log('Received request', req);
  var data = ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email()
  });
  res.status(200).send(data);
});

module.exports = router;
