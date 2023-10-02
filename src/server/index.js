const express = require("express");
const database = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

// nhi hoga pura control Z
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
    // {
    //   $unwind: "$documents",
    // },
    // {
    //   $replaceRoot: { newRoot: "$documents" },
    // },
  ]);
  console.log(val);

  const regions = val.map((obj) => obj._id);

  //   console.log(regions);

  res
    .json(
      await database.find(
        {
          region: { $in: regions }, //acch in use krna h dekhti
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

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
