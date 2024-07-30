const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // entry: "./src/index.js", -> single bundle: SPA
  entry: "./src/hello-world.js",
  output: {
    filename: "[name].[contenthash].js", //  name: the entrypoint file name - splitting; contenthash = MD5 hash. browser caching
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9001/",
    // clean: {
    //   // manage build cleaning
    //   dry: true,
    //   keep: /\.css/,
    // },
  },
  mode: "production",
  // used for extracting common dependencies while code splitting
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000,
      automaticNameDelimiter: "_",
    },
  },
  // handle assets
  module: {
    rules: [
      {
        test: /\.scss$/,
        // loaders order matters
        // webpack process loaders from right to left
        // 1st: sass-loader converts scss to css
        // 2nd: css-loader reads the css content
        // 3rd: style-loaders injects the style to the page
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    // Code splitting
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "Some description",
    }),
    new ModuleFederationPlugin({
      name: "HelloWorldApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloWorldButton":
          "./src/components/hello-world-button/hello-world-button.js",
        "./HelloWorldPage":
          "./src/components/hello-world-page/hello-world-page.js",
      },
    }),
  ],
};
