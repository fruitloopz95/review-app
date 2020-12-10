module.exports = function(app) {
  const reviews = require('../controllers/reviews.controller.js');
  app.post('/createUser', reviews.createUser);
}
