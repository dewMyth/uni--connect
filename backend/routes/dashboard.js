const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Degree = require("../models/Degree");
const Department = require("../models/Department");
const Faculty = require("../models/Faculty");
const UserView = require("../models/UserViews");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const storage = require("node-persist");

// User Visits
let counter = 0;
let counterPublic = 0;

router.get("/visits", (req, res) => {
  counter = counter + 1;

  storage.setItem("counter", counter).then(() => {
    res.json(counter);
  });
});

router.get("/public-visits", (req, res) => {
  counterPublic = counterPublic + 1;

  storage.setItem("counterPublic", counterPublic).then(() => {
    res.json(counterPublic);
  });
});

storage
  .init()
  .then(() => storage.getItem("counter"))
  .then((value) => {
    if (value > 0) {
      counter = value;
    } else {
      counter = 0;
    }
  })
  .then(() => storage.getItem("counterPublic"))
  .then((value) => {
    if (value > 0) {
      counterPublic = value;
    } else {
      counterPublic = 0;
    }
  });

router.get("/get-user-visits", (req, res) => {
  res.json(counter);
});

router.get("/get-public-visits", (req, res) => {
  res.json(counterPublic);
});

//   //Public Visits
// let counter = 0;

// router.get("/public-visits", (req, res) => {
//   counter = counter + 1;

//   storage.setItem("counter", counter).then(() => {
//     res.json(counter);
//   });
// });

// storage
//   .init()
//   .then(() => storage.getItem("counter"))
//   .then((value) => {
//     if (value > 0) {
//       counter = value;
//     } else {
//       counter = 0;
//     }
//   });

//Total Users
router.get("/total-users", (req, res) => {
  User.find()
    .count()
    .then((result) => {
      res.json(result);
    });
});

//Total Posts
router.get("/total-posts", (req, res) => {
  Post.find()
    .count()
    .then((result) => {
      res.json(result);
    });
});

// Total Posts Likes
router.get("/total-posts-likes", (req, res) => {
  Post.aggregate([{ $unwind: "$likes" }, { $count: "total_likes" }]).then(
    (result) => {
      res.json(result);
    }
  );
});

// Total Posts Comments
router.get("/total-posts-comments", (req, res) => {
  Post.aggregate([{ $unwind: "$comments" }, { $count: "total_comments" }]).then(
    (result) => {
      res.json(result);
    }
  );
});

router.get("/new-users", (req, res) => {
  User.find()
    .populate("degree")
    .populate("department")
    .sort({ created: -1 })
    .limit(3)
    .then((result) => {
      res.json(result);
    });
});

router.get("/new-posts", (req, res) => {
  Post.aggregate([{ $sort: { created: -1 } }, { $limit: 5 }]).then((result) => {
    res.json(result);
  });
});

router.get("/new-posts-comments", (req, res) => {
  Post.aggregate([
    { $group: { _id: "$comments" } },
    // { $unwind: "$comments" },
    {
      $lookup: {
        from: "users",
        localField: "_id.postedBy",
        foreignField: "_id",
        as: "POSTER",
      },
    },
    { $sort: { created: 1 } },
    { $limit: 5 },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/userWithDegree", (req, res) => {
  User.aggregate([
    {
      $lookup: {
        from: "degrees",
        localField: "degree",
        foreignField: "_id",
        as: "degree",
      },
    },
    { $group: { _id: "$degree.degreeTitle", count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});

//Highest User Departments
router.get("/userWithDepartment", (req, res) => {
  User.aggregate([
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "dep",
      },
    },
    { $group: { _id: "$dep.departmentTitle", count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});

//Highest User Faculties
router.get("/userWithFaculty", (req, res) => {
  User.aggregate([
    {
      $lookup: {
        from: "faculties",
        localField: "faculty",
        foreignField: "_id",
        as: "fac",
      },
    },
    { $group: { _id: "$fac.facultyTitle", count: { $sum: 1 } } },
    { $sort: { created: 1 } },
  ]).then((result) => {
    res.json(result);
  });
});

/////////////////// DAILY ///////////////////////

// new Date() : Right Now time in ISO format
// new Date().getTime() : RightNow Time in miliseconds
router.get("/daily/users", (req, res) => {
  User.aggregate([
    {
      $match: {
        created: {
          $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        },
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/daily/posts", (req, res) => {
  Post.aggregate([
    {
      $match: {
        created: {
          $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        },
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/daily/posts-likes", (req, res) => {
  Post.aggregate([
    {
      $match: {
        created: {
          $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $group: { _id: "$likes", count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/daily/posts-comments", (req, res) => {
  Post.aggregate([
    {
      $match: {
        created: {
          $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $group: { _id: "$comment", count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});
////////////////////Weekly///////////////////////
router.get("/weekly/users", (req, res) => {
  User.aggregate([
    {
      $match: {
        created: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$created",
            format: "%Y-%m-%d",
          },
        },
        count: { $sum: 1 },
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/weekly/posts", (req, res) => {
  Post.aggregate([
    {
      $match: {
        created: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

////////////////////Monthly///////////////////////

module.exports = router;
