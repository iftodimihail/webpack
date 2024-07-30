const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use("/", express.static(path.resolve(__dirname, "../dist"))); // handle the css and js static files

app.get("/", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(9001, () =>
  console.log("Application is running on http://localhost:9001/")
);
