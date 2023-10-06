const Router = require("express");
const database = require("../db");
const router = Router();

//Pie
router.get("/", async (req, res) => {
  let val = await database.aggregate([
    {
      $group: {
        _id: "$source",
        value: { $sum: 1 },
      },
    },
    {
      $match: {
        value: { $gt: 10 },
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
  //   console.log(val);
  res.json(val).end();
});

//filter
router.get("/:count", async (req, res) => {
  console.log(req.params.count);

  let val;
  if (req.params.count === undefined || req.params.count == 0) {
    val = await database.aggregate([
      {
        $group: {
          _id: "$source",
          value: { $sum: 1 },
        },
      },
      {
        $match: {
          value: { $gt: 10 },
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
  } else {
    val = await database.aggregate([
      {
        $match: {
          //   end_year: { $eq: Number(req.params.count) }, // yaha year ke jaga pestle: { $eq: req.params.pestle} karna
          value: { $gt: Number(req.params.count) },
        },
      },
      {
        $group: {
          _id: "$source",
          value: { $sum: 1 },
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
  }
  console.log(val);

  res.json(val).end();
});

module.exports = router;
