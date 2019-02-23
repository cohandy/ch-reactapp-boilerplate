if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const config = require("./config.js");
let app = express();

app = config(app);
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
