import "./kiwi-image.scss";

import Kiwi from "./kiwi.jpg";
import altText from "./altText.txt";

class KiwiImage {
  render() {
    const img = document.createElement("img");
    img.src = Kiwi;
    img.alt = altText;
    img.classList.add("kiwi-image");

    document.body.appendChild(img);
  }
}

export default KiwiImage;
