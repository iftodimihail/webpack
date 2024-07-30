import "./hello-world-button.scss";

class HelloWorldButton {
  buttonCssClass = "hello-world-button";
  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello world";
    button.classList.add(this.buttonCssClass);
    button.onclick = function () {
      const p = document.createElement("p");
      p.classList.add("hello-world-text");
      p.innerHTML = "Hello world!";
      document.body.appendChild(p);
    };
    document.body.appendChild(button);
  }
}

export default HelloWorldButton;
