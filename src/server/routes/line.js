const Router = require("express");
const database = require("../db");
const router = Router();

router.get("/:country", async (req, res) => {
  if (req.params.country == "none") {
    req.params.country = "[sS]*";
  }
  const country = req.params.country;

  console.log(country);
  const relevance = await database.aggregate([
    {
      $match: {
        country: { $regex: country },
      },
    },
    {
      $group: {
        _id: "$pestle",
        averageRelevance: { $avg: "$relevance" },
      },
    },
    {
      $project: {
        _id: 0,
        x: "$_id",
        y: "$averageRelevance",
      },
    },
    {
      $sort: { x: 1 },
    },
  ]);

  const intensity = await database.aggregate([
    {
      $match: {
        country: { $regex: country },
      },
    },
    {
      $group: {
        _id: "$pestle",
        averageIntensity: { $avg: "$intensity" },
      },
    },
    {
      $project: {
        _id: 0,
        x: "$_id",
        y: "$averageIntensity",
      },
    },
    {
      $sort: { x: 1 },
    },
  ]);

  const likelihood = await database.aggregate([
    {
      $match: {
        country: { $regex: country },
      },
    },
    {
      $group: {
        _id: "$pestle",
        averageLikelihood: { $avg: "$likelihood" },
      },
    },
    {
      $project: {
        _id: 0,
        x: "$_id",
        y: "$averageLikelihood",
      },
    },
    {
      $sort: { x: 1 },
    },
  ]);

  // console.log(intensity);

  res
    .json([
      {
        id: "relevance",
        data: relevance,
      },
      {
        id: "intensity",
        data: intensity,
      },
      {
        id: "likelihood",
        data: likelihood,
      },
    ])
    .end();
});

module.exports = router;
