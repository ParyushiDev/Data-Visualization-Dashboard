const Router = require("express");
const database = require("../db");
const router = Router();

//filter
router.get("/:year", async (req, res) => {
  console.log(req.params.year);

  let val;
  if (req.params.year === "undefined" || req.params.year == 0) {
    val = await database.aggregate([
      {
        $group: {
          _id: "$topic",
          value: { $sum: 1 },
        },
      },
      {
        $match: {
          value: { $gt: 20 },
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
          end_year: { $eq: Number(req.params.year) },
        },
      },
      {
        $group: {
          _id: "$topic",
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

  res.json(val).end();
});

module.exports = router;
