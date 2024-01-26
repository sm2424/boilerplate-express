let express = require("express");
const bodyParser = require('body-parser');
let app = express();
require('dotenv').config();

//#11
app.use(bodyParser.urlencoded({ extended: false}));

//#1
//console.log("Hello World");

/*#2
app.get("/", function (req, res) {
  res.send("Hello Express");
});*/

//#4
app.use("/public", express.static(__dirname + "/public"));


//#7
app.use((req, res, next) => {
  console.log(req.method, req.path, "-", req.ip);
  next();
});

//#3
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/* #5

app.get("/json", function (req, res) {
  res.json({ message: "Hello json" });
});*/

//#6 first code is not working
// app.get("/json", (req, res) => {
//   if (process.env["MESSAGE_STYLE"] === "uppercase") {
//     res.json({ message: "HELLO JSON" });
//   } else {
//     res.json({ message: "Hello Json" });
//   }
// });
/* #6
app.get("/json", (req, res) => {
  let response = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
});*/

//#8
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  },
);

//#9

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({ echo: word});
});

/*//#10 Option 1
app.get("/name", (req, res) => {
   res.json({ name: req.query.first + " " + req.query.last });
});*/

/*//#10 Option 2
app.get("/name", (req, res) => {
const { first, last } = req.query;
res.json({ name: first +  " " + last });
  }); */

  /* //#12 Option 1
  app.post("/name", (req, res) => {
    res.json({ name: req.body.first + " " + req.body.last });
 });  */

  //#12 Option 2
  app.post("/name", (req, res) => {
    const { first, last } = req.body;
    res.json({ name: first +  " " + last });
      });
  
module.exports = app;
