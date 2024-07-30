import "./navigation-bar.scss";

class NavigationBar {
  render(navigationItems) {
    const ul = document.createElement("ul");
    ul.classList.add("navigation-bar");

    navigationItems.forEach((navItem) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <li>
          <a href="${navItem.url}">${navItem.title}</a>
        </li>
      `;
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
  }
}

export default NavigationBar;
