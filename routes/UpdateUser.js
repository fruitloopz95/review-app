module.exports = function(app) {
  const reviews = require('../controllers/reviews.controller.js');
  app.put('/updateUser', reviews.updateUser);
}
