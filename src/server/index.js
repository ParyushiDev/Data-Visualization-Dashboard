const express = require("express");
const database = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 9090;
const url = "mongodb://localhost:27017";

const bar = require("./routes/bar");
const pie = require("./routes/pie");
const line = require("./routes/line");
const pie2 = require("./routes/pie2");

app.use(cors());

//connection to mongodb
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Connected to mongoDB");
    },
    (err) => {
      console.log("Could not connect to mongoDB" + err);
    }
  );

app.use("/bar", bar);
app.use("/pie", pie);
app.use("/line", line);
app.use("/pie2", pie2);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
