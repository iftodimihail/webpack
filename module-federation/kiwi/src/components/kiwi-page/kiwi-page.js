import Heading from "../heading/heading.js";
import KiwiImage from "../kiwi-image/kiwi-image.js";

class KiwiPage {
  render() {
    const heading = new Heading();
    heading.render("kiwi");

    const kiwiImage = new KiwiImage();
    kiwiImage.render();

    import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
      const HelloWorldButton = HelloWorldButtonModule.default;
      const helloWorldButton = new HelloWorldButton();
      helloWorldButton.render();
    });
  }
}

export default KiwiPage;
