const App = require("./public/static/server/app").App;
const express = require("express");
const app = express();
const Cookies = require("cookies");

app.use(express.static("public/static/client"));

app.get("/favicon.ico", function(req, res) {
  res.status(204);
});

app.get("*", async function(req, res) {
  const cookies = new Cookies(req, res);
  const html = await App.App.getHTML(cookies);
  res.send(html.html);
});

app.listen(5555, function() {
  console.log("Running on http://localhost:" + 5555);
});
