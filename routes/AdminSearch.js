module.exports = function(app) {
  const reviews = require('../controllers/reviews.controller.js');
  app.get('/AdminSearch', reviews.AdminSeach);
}
