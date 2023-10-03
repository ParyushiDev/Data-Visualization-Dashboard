const express = require("express");
const database = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { cl } = require("@fullcalendar/core/internal-common");

const app = express();
const port = 9090;
const url = "mongodb://localhost:27017";

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

//bar
app.get("/bar", async (req, res) => {
  // console.log(req.params.topic);
  // console.log(req.params.sector);

  const val = await database.aggregate([
    {
      $group: {
        _id: "$region",
        // documents: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        count: { $gt: 20 },
      },
    },
  ]);
  // console.log(val);

  const regions = val.map((obj) => obj._id);

  //   console.log(regions);

  res
    .json(
      await database.find(
        {
          region: { $in: regions },
        },
        {
          _id: 0,
          intensity: 1,
          relevance: 1,
          likelihood: 1,
          region: 1,
          end_year: 1,
        }
      )
    )
    .end();
});

//Pie
app.get("/pie", async (req, res) => {
  const val = await database.aggregate([
    {
      $group: {
        _id: "$topic", // sum matlab ek topic ka count
        value: { $sum: 1 }, //vo sum h ok ok
      },
    },
    {
      $match: {
        value: { $gt: 20 }, //greater than 20
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        value: "$value",
      },
    },
  ]);

  // console.log(val);

  res.json(val).end();
});

//line

app.get("/line", async (req, res) => {
  const val = await database.aggregate([
    {
      $group: {
        _id: {
          region: "$region",
          pestle: "$pestle",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.region",
        data: {
          $push: {
            x: "$_id.pestle",
            y: "$count",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        data: 1,
      },
    },
  ]);

  console.log(val);
  res.json(val).end();
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
