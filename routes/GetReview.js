module.exports = function(app) {
  const reviews = require('../controllers/reviews.controller.js');
  app.get('/getReview', reviews.getReview);
}
