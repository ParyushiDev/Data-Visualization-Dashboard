const Router = require("express");
const database = require("../db");
const router = Router();
//bar
router.get("/", async (req, res) => {
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

module.exports = router;
