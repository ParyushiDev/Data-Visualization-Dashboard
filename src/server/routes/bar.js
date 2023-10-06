const Router = require("express");
const database = require("../db");
const router = Router();
//bar
router.get("/", async (req, res) => {
  const val = await database.aggregate([
    {
      $group: {
        _id: "$region",
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
          sector: 1,
          // end_year: 1,
        }
      )
    )
    .end();
});
router.get("/:startY", async (req, res) => {
  console.log(req.params.startY);
  let val;
  if (req.params.startY === undefined || req.params.startY == 0) {
    val = await database.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 20 },
        },
      },
    ]);
  } else {
    val = await database.aggregate([
      {
        $match: {
          // count: { $gt: 10 },
          start_year: { $eq: Number(req.params.startY) },
          // pestle: { $eq: req.params.pestle },
        },
      },
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
        },
      },
    ]);
  }
  console.log(val);

  const regions = val.map((obj) => obj._id);

  // console.log(regions);

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
          start_year: 1,
          // sector: 1,
        }
      )
    )
    .end();
});

module.exports = router;
