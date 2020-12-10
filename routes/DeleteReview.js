module.exports = function(app) {
  const reviews = require('../controllers/reviews.controller.js');
  app.delete('/deleteReview', reviews.deleteReview);
}
