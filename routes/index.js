var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
      title: 'Azure 云计算平台与服务' 
    });
});

module.exports = router;
