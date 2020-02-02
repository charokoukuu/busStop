var express = require('express'),
  app = express();
var add = "0";
var add2 = "0";
var sumiregaoka = require("./json/timeTableSumiregaoka.json");
var debug = 0;
require('date-utils');
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
// app.use((req, res, next) => {
//   res.send("Custom!");
//   next();
// });

app.get('/', (req, res) => {
  var dt = new Date();
  var formatted = dt.toFormat("H");
  var formatted2 = dt.toFormat("MI");
  debug = Number(formatted);
  add = debug;
  add2 = debug + 1;
  if (formatted2 > 45) {
    res.send(formatted + "時代：" + "[" + sumiregaoka.weekdays[add].filter(value => {
      return value > formatted2;
    }) + "]" + "\n" +
      add2.toString() + "時代：" + "[" + sumiregaoka.weekdays[add2].filter(value => {
        return value < 15;
      }) + "]"

    );
  } else {
    res.send(formatted + "時代：" + "[" + sumiregaoka.weekdays[add].filter(value => {
      return value > formatted2;
    }) + "]");
  }
  // if (formatted2 > 45) {

  // }
  console.log(add);
  console.log(add2);
});
app.get('/neko/:name', function (req, res) {
  res.send('html ' + req.params.name);
});
app.get('/hello.txt', function (req, res) {
  res.send('html2');
});
app.get('/hello.txt', function (req, res) {
  res.sendfile(__dirname + '/public/about.txt');
});

app.listen(3000);
console.log("starting...")