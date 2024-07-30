import Heading from "./components/heading/heading.js";
import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import React from "react";

// import addImage from "./add-image.js";

// addImage();

const heading = new Heading();
heading.render("hello world");

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}
