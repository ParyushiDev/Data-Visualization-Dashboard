const Router = require("express");
const database = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const rel = await database.aggregate([
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
        data: rel,
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
