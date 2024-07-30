import Heading from "../heading/heading.js";
import HelloWorldButton from "../hello-world-button/hello-world-button.js";

class HelloWordPage {
  render() {
    const heading = new Heading();
    heading.render("hello world");

    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
}

export default HelloWordPage;
