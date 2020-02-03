var express = require('express'),
  app = express();
var add = "0";
var add2 = "0";
var sumiregaoka = require("./json/timeTableSumiregaoka.json");
var takarazuka = require("./json/timeTableTakarazuka.json");
var debug = 0;
var text = "";
require('date-utils');
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
const lineNotify = require('line-notify-nodejs')('ubnCYGu4bTMEDw2QCkO0U6pNMTVbj305HFDxc06lYdL'); // 先ほどコピーしたトークン
app.use(express.static(__dirname + '/public'));
// app.use((req, res, next) => {
//   res.send("Custom!");
//   next();
// });

app.get('/sumi', (req, res) => {
  var dt = new Date();
  var formatted = dt.toFormat("HH24");
  var formatted2 = dt.toFormat("MI");
  debug = Number(formatted);
  add = debug;
  add2 = debug + 1;
  if (formatted2 > 45) {
    text = "[行き]" + formatted + "時代：" + sumiregaoka.weekdays[add].filter(value => {
      return value > formatted2;
    }) + "\n" +
      add2.toString() + "時代：" + sumiregaoka.weekdays[add2].filter(value => {
        return value < 15;
      });


  } else {
    text = "[行き]" + formatted + "時代：" + sumiregaoka.weekdays[add].filter(value => {
      return value > formatted2;
    });
    lineNotify.notify({
      message: text,
    }) + "]";
  }
  // if (formatted2 > 45) {

  // }
  console.log(add);
  console.log(add2);
  res.end();
});
app.get('/taka', (req, res) => {
  var dt = new Date();
  var formatted = dt.toFormat("HH24");
  var formatted2 = dt.toFormat("MI");
  debug = Number(formatted);
  add = debug;
  add2 = debug + 1;
  if (formatted2 > 45) {
    text = "[帰り]" + formatted + "時代" + takarazuka.weekdays[add].filter(value => {
      return value > formatted2;
    }) + "\n" +
      add2.toString() + "時代：" + takarazuka.weekdays[add2].filter(value => {
        return value < 15;
      });


  } else {
    text = "[帰り]" + formatted + "時代："
      + takarazuka.weekdays[add].filter(value => {
        return value > formatted2;
      });
    lineNotify.notify({
      message: text,
    });
  }
  // if (formatted2 > 45) {

  // }
  console.log(add);
  console.log(add2);
  res.end();

});


app.listen(3000);
console.log("starting...");