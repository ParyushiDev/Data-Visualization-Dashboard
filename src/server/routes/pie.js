const Router = require("express");
const database = require("../db");
const router = Router();

//Pie
router.get("/", async (req, res) => {
  let val = await database.aggregate([
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
  res.json(val).end();
});

//filter
router.get("/:year", async (req, res) => {
  console.log(req.params.year);

  let val;
  if (req.params.year === undefined || req.params.year == 0) {
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
          end_year: { $eq: Number(req.params.year) }, // yaha year ke jaga pestle: { $eq: req.params.pestle} karna
        },
      },
      // jo bhi basic flow pata laga na
      /*
        ek filter state banana h, aur usko graphs ke components m prop karke dena h

        jab hi koi dropdowns m click karenge, toh filter state change honge

        fir jo graphs h wo rerender karenge

        re render hone se firse backend pe request jayega, lekin request m filter parameter rehega,

        fir backend ko change karna parega jese yaha kiya, ki agar filter h toh filtered data bhejo

        warna default

        theek h na? saare ki hi ese hi honge more or less
      */
      //
      {
        $group: {
          _id: "$topic",
          value: { $sum: 1 },
        },
      },
      // {
      //   $match: {
      //     value: { $gt: 20 },
      //   },
      // },
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
