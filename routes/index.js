var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jason\'s Test Server' });
});

/* Webchat Research page*/
app.get('/webchat',function(req,res){
  res.sendFile(path.join(__dirname+'/html/wechat-small-program.html'));
  //__dirname : It will resolve to your project folder.
});

module.exports = router;
