var express = require('express'),
  app = express();
var add = "0";
var add2 = "0";
var sumiregaoka = require("./json/timeTableSumiregaoka.json");
var takarazuka = require("./json/timeTableTakarazuka.json");
var debug = 0;
var text = "";
var judge = "";
var os = require('os');
var hostname = os.hostname();
require('date-utils');
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
var lineNotify; // 先ほどコピーしたトークン
app.use(express.static(__dirname + '/public'));
// app.use((req, res, next) => {
//   res.send("Custom!");
//   next();
// });

app.get('/sumi/:lineurl', (req, res) => {
  lineNotify = require('line-notify-nodejs')(req.params.lineurl);
  var dt = new Date();
  var formatted = dt.toFormat("HH24");
  var formatted2 = dt.toFormat("MI");
  var week = dt.toFormat("DDD");
  if (week == "Sat") {
    judge = "holiday";
  } else if (week == Sun) {
    judge = "sun";

  } else {
    judge = "weekdays";
  }
  debug = Number(formatted);
  add = debug;
  add2 = debug + 1;
  if (formatted2 > 45) {
    text = "[行き]" + formatted + "時代：" + sumiregaoka[judge][add].filter(value => {
      return value > formatted2;
    }) + "\n" +
      add2.toString() + "時代：" + sumiregaoka[judge][add2].filter(value => {
        return value < 15;
      });

    lineNotify.notify({
      message: text,
    });
  } else {
    text = "[行き]" + formatted + "時代：" + sumiregaoka[judge][add].filter(value => {

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
app.get('/taka/:lineurl', (req, res) => {
  lineNotify = require('line-notify-nodejs')(req.params.lineurl);
  var dt = new Date();
  var formatted = dt.toFormat("HH24");
  var formatted2 = dt.toFormat("MI");
  var week = dt.toFormat("DDD");
  if (week == "Sat") {
    judge = "holiday";
  } else if (week == Sun) {
    judge = "sun";

  } else {
    judge = "weekdays";
  }
  debug = Number(formatted);
  add = debug;
  add2 = debug + 1;
  if (formatted2 > 45) {
    text = "[帰り]" + formatted + "時代:" + takarazuka[judge][add].filter(value => {
      return value > formatted2;
    }) + "\n" +
      add2.toString() + "時代：" + takarazuka[judge][add2].filter(value => {
        return value < 15;
      });
    lineNotify.notify({
      message: text,
    });

  } else {
    text = "[帰り]" + formatted + "時代："
      + takarazuka[judge][add].filter(value => {
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
  console.log(week);
  res.end();

});

app.get('/eugeo/:lineurl', (req, res) => {
  lineNotify = require('line-notify-nodejs')(req.params.lineurl);
  lineNotify.notify({
    message: "それな",
  });
  res.end();
});
let dire = () => {
  lineNotify.notify({
    message: "この時間ダイヤはありません。",
  });
}

app.listen(2000);
console.log("starting...");
console.log(hostname);
