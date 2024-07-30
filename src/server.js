const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use("/static", express.static(path.resolve(__dirname, "../dist"))); // handle the css and js static files

app.get("/hello-world", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.get("/kiwi", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/kiwi.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(3000, () =>
  console.log("Application is running on http://localhost:3000/")
);
