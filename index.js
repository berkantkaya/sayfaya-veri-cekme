const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
//CORS- ISSUE SORTED
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});
//CORS- ISSUE SORTED
app.get("/", async function (req, res) {
  // var prediction = "";
  // var prediction1 = "";
  // var horoscope = [
  //   "none",
  //   "pasa king",
  //   "ali_ihsan21",
  //   "ce e Ne Ka",
  //   "Mustakil_Yazar",
  //   "ali_ihsan21",
  //   "gewa",
  //   "yokohamea",
  //   "kelebegin_intiharı",
  //   "celebic",
  //   "general4242",
  //   "ali_ihsan21",
  //   "burakyilmaaz",
  //   "atillabalci",
  //   "Lexco",
  //   "Sedat.",
  //   "intel7mix",
  //   "SON OF GOD",
  // ];
  // var json = [];
  // for (id = 1; id < 18; id++) {
  //   url =
  //

  //   console.log(url);
  //   var data = await new Promise(function (resolve, reject) {
  //     request(url, function (error, response, html) {
  //       if (!error) {
  //         $ = cheerio.load(html);

  //         prediction = $(" .ki-kullaniciadi > a > b").text();
  //         prediction1 = $(" tr > td").text();

  //         resolve({
  //           id: id,
  //           yorumcu: horoscope[id],
  //           TumYorumcular: prediction,
  //           yorum1: prediction1,
  //         });
  //       } else {
  //         reject(undefined);
  //       }
  //     });
  //   });
  //   json.push({ ...data });
  // }
  url =
    "https://forum.donanimhaber.com/samsung-galaxy-note-2-ana-konu-ilk-sayfayi-okuyun--65197472-4230#146321901";

  var data = await new Promise(function (resolve, reject) {
    request(url, function (error, response, html) {
      if (!error) {
        $ = cheerio.load(html);

        var messages = []
        let arr = $(".ikide1renk li")
          .toArray()
          .map((x) => {
            var user = cheerio.load(x);
            var username = user(".ki-cevapsahibi > .ki-kullaniciadi > a > b").text()

            var message =  user(".msg").text().replace(/\n/g,'').trim()

            if(username) {
              messages.push({
               yorumu_yapan: username,
               yorumu: message
              })
                
            }
            
          });

        console.log("ATRRRRRR", messages);

        resolve(messages);
      } else {
        reject(undefined);
      }
    });
  });
  console.log("data", data);

  res.send(data);
});
app.listen(process.env.PORT || 5000);
module.exports = app;
