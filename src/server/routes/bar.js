const Router = require("express");
const database = require("../db");
const router = Router();

router.get("/:startY", async (req, res) => {
  let data;
  if (req.params.startY === "undefined" || req.params.startY == 0) {
    data = await database.aggregate([
      {
        $group: {
          _id: "$region",
          sector_counts: { $push: "$sector" },
        },
      },
      {
        $limit: 15,
      },

      {
        $unwind: "$sector_counts",
      },

      {
        $group: {
          _id: {
            region: "$_id",
            sector: "$sector_counts",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id.region",
          sector: "$_id.sector",
          count: 1,
        },
      },
    ]);
  } else {
    data = await database.aggregate([
      {
        $match: { start_year: { $eq: Number(req.params.startY) } },
      },
      {
        $group: {
          _id: "$region",
          sector_counts: { $push: "$sector" },
        },
      },
      // {
      //   $limit: 10,
      // },

      {
        $unwind: "$sector_counts",
      },

      {
        $group: {
          _id: {
            region: "$_id",
            sector: "$sector_counts",
          },
          count: { $sum: 1 },
        },
      },

      {
        $project: {
          _id: 0,
          region: "$_id.region",
          sector: "$_id.sector",
          count: 1,
        },
      },
    ]);
  }

  let finalObj = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i].region === "" || data[i].sector === "") {
      continue;
    }
    if (!finalObj[data[i].region]) {
      finalObj[data[i].region] = {};
    }
    finalObj[data[i].region][data[i].sector] = data[i].count;
  }

  let finalArr = [];

  for (i in finalObj) {
    let curr = { region: i };
    for (j in finalObj[i]) {
      curr[j] = finalObj[i][j];
    }
    finalArr.push(curr);
  }

  console.log(finalArr);

  res.json(finalArr);
});

// router.get("/:startY", async (req, res) => {
//   console.log(req.params.startY);
//   let val;
//   if (req.params.startY === "undefined" || req.params.startY == 0) {
//     val = await database.aggregate([
//       {
//         $group: {
//           _id: "$region",
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $match: {
//           count: { $gt: 20 },
//         },
//       },
//     ]);
//   } else {
//     val = await database.aggregate([
//       {
//         $match: {
//           start_year: { $eq: Number(req.params.startY) },
//         },
//       },
//       {
//         $group: {
//           _id: "$region",
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//   }
//   console.log(val);

//   const regions = val.map((obj) => obj._id);

//   // console.log(regions);

//   res
//     .json(
//       await database.find(
//         {
//           region: { $in: regions },
//         },
//         {
//           _id: 0,
//           intensity: 1,
//           relevance: 1,
//           likelihood: 1,
//           region: 1,
//           start_year: 1,
//           sector: 1,
//         }
//       )
//     )
//     .end();
// });

// router.get("/", async (req, res) => {
//   const val = await database.aggregate([
//     {
//       $group: {
//         _id: {
//           region: "$region",
//           sector: "$sector",
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $group: {
//         _id: "$_id.region",
//         sectors: {
//           $push: {
//             sector: "$_id.sector",
//             count: "$count",
//           },
//         },
//       },
//     },
//     // {
//     //   $project: {
//     //     region: "$_id",
//     //     _id: 0,
//     //     sectors: 1,
//     //   },
//     // },
//   ]);

//   const regions = val.map((obj) => obj._id);
//   res
//     .json(
//       await database.find(
//         {
//           region: { $in: regions },
//         },
//         {
//           _id: 0,
//           sector: 1,
//           region: 1,
//         }
//       )
//     )
//     .end();
// });

module.exports = router;
