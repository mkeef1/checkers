'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/sum', function(req, res){
  res.render('sum');
});

app.get('/add/:a/:b/:c/:d', function(req, res){
  req.params.a *= 1;
  req.params.b *= 1;
  req.params.c *= 1;
  req.params.d *= 1;

  req.params.e = req.query.fontsize;
  req.params.f = req.query.color;
  req.params.g = req.query.border;
  req.params.h = req.query.bordercolor;
  req.params.i = req.query.borderwidth;

  res.render('sum', req.params);
});

app.get('/sum_list/:nums', function(req, res){
  var nums = req.params.nums.split(',');

  nums = nums.map(function(n){
    return n * 1;
});

  var sum = 0;
  for(var i = 0; i < nums.length; i++){
    sum +=nums[i];
  }

  res.render('sum_list', {nums:nums, sum:sum, even:req.query.even, odd:req.query.odd});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening...');
});
