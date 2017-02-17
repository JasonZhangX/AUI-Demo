var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Jason Test Server'
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'html/wechat-small-program.html'));
});

module.exports = router;