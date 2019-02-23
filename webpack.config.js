const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./client/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js"
  },
  mode: process.env.NODE_ENV || "development",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: ["transform-decorators-legacy"],
          presets: ["es2015", "react", "stage-1"]
        }
      },
      {
        test: /\.less|css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: { config: { path: "./postcss.config.js" } }
          },
          "less-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../dist/bundle.css"
    })
  ]
};
