import NavigationBar from "./components/navigation-bar/navigation-bar";

const url = window.location.pathname;

const navigationItems = [
  {
    url: "/hello-world-page",
    title: "Hello World Page",
  },
  {
    url: "/kiwi-page",
    title: "Kiwi Page",
  },
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

if (url === "/hello-world-page") {
  import("HelloWorldApp/HelloWorldPage").then((HelloWordPageModule) => {
    const HelloWorldPage = HelloWordPageModule.default;
    const helloWorldPage = new HelloWorldPage();
    helloWorldPage.render();
  });
} else if (url === "/kiwi-page") {
  import("KiwiApp/KiwiPage").then((KiwiPageModule) => {
    const KiwiPage = KiwiPageModule.default;
    const kiwiPage = new KiwiPage();
    kiwiPage.render();
  });
}
