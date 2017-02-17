var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Jason Test Server'
  });
});

router.get('/wechat-lite-app-research', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../html/wechat-small-program.html'));
});

module.exports = router;