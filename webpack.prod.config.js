const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: "./src/index.js", -> single bundle: SPA
  entry: {
    "hello-world": "./src/hello-world.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    filename: "[name].[contenthash].js", //  name: the entrypoint file name - splitting; contenthash = MD5 hash. browser caching
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
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
        test: /\.css$/,
        // import loaders
        // css-loader: reads the contents of the css file and returns the contents
        // style-loader: takes the css and injects it to the page using style tags (previously)
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
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
      chunks: ["hello-world"], // chunks name are the ones specified in the entry object
      title: "Hello world!",
      template: "src/page-template.hbs",
      description: "Some description",
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "Kiwi!",
      template: "src/page-template.hbs",
      description: "Kiwi",
    }),
  ],
};
