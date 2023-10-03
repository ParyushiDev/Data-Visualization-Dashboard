const Router = require("express");
const database = require("../db");
const router = Router();

//Pie
router.get("/", async (req, res) => {
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

module.exports = router;
