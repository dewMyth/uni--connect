const router = require("express").Router();

const Department = require("../models/Department");

// router.route("/").get((req, res) => {
//   Department.find()
//     .then((departments) => res.json(departments))
//     .catch((err) => res.status(400).json("Error:" + err));
// });

router.route("/").get((req, res) => {
  Department.find()
    .populate("degrees", "_id degreeTitle degreeDescription")
    .select("")
    .then((degrees) => {
      res.json(degrees);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const newDepartment = new Department({
    departmentTitle: req.body.departmentTitle,
    departmentImage: req.body.departmentImage,
    departmentDescription: req.body.departmentDescription,
    degrees: req.body.degrees,
    faculty: req.body.faculty,
  });

  newDepartment
    .save()
    .then(() => res.json("Department Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
