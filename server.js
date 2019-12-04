var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = process.env.PORT || 8000;

var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));


// mongoose.connect("mongodb://localhost/news-scraper", { useNewUrlParser: true })

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";

var exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
});

//Get route

app.get("/scrape", function(req, res) {
    axios.get("https://www.npr.org").then(function(response) {
        var $ = cheerio.load(response.data);

        $(".stories-wrap").each(function(index, element) {
          var result = {};
          result.title = $(this)
          .find("h3.title")
          .text()
          console.log(result);
        })
        
    })
})

app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});