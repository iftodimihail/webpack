const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // entry: "./src/index.js", -> single bundle: SPA
  entry: "./src/kiwi.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
    clean: {
      // manage build cleaning
      dry: true,
      keep: /\.css/,
    },
  },
  mode: "development",
  devServer: {
    port: 9002,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "kiwi.html",
      writeToDisk: true,
    },
  },
  // handle assets
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/, // image rule
        type: "asset",
        parser: {
          dataUrlCondition: {
            // condition for using either asset/inline or asset/resource
            maxSize: 3 * 1024, // 3 kilobytes
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.scss$/,
        // loaders order matters
        // webpack process loaders from right to left
        // 1st: sass-loader converts scss to css
        // 2nd: css-loader reads the css content
        // 3rd: style-loaders injects the style to the page
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"], // compiles ECMAscript 6, 7, 8 etc into 5
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      title: "Kiwi",
      template: "src/page-template.hbs",
      description: "Kiwi",
    }),
    new ModuleFederationPlugin({
      name: "KiwiApp",
      filename: "remoteEntry.js",
      exposes: {
        "./KiwiPage": "./src/components/kiwi-page/kiwi-page.js",
      },
      remotes: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
      },
    }),
  ],
};
