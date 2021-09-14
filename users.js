var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
// handler for the /user/:id path, which sends a special response
router.get(['/','/:id([0-9]+)'], function (req, res, next) {
  res.json({  
    name: req.params.name,
    surname: req.query.surname,
    address: req.query.address,
    id: req.params.id,
    phone: req.query.phone
  });
})


router.get('/create', function(req, res) {
  res.sendStatus(404);
});
// define the about route
router.get('/list', function(req, res) {
  res.send('Users\'s list');
});


module.exports = router;

