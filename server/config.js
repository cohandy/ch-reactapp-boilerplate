const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");

module.exports = app => {
  app.use(helmet());
  if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }
  app.use(cookieParser("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/dist", express.static(path.join(__dirname, "../dist")));
  
  if(process.env.NODE_ENV === "localhost" || !process.env.NODE_ENV) {
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.config");
    const compiler = webpack(webpackConfig);

    app.use(
      require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        writeToDisk: true
      })
    );
  }

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "./index.html"));
  })

  //error handler
  app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "production") {
      console.log("Server error!");
    } else {
      next(err);
    }
  });

  return app;
};
