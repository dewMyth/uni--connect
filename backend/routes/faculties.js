const router = require("express").Router();

const Faculty = require("../models/Faculty");

// router.route("/").get((req, res) => {
//   Faculty.find()
//     .then((faculties) => res.json(faculties))
//     .catch((err) => res.status(400).json("Error:" + err));
// });

router.route("/").get((req, res) => {
  Faculty.find()
    .populate(
      "departments",
      "_id departmentTitle departmentDescription degrees"
    )
    .select("")
    .then((departments) => {
      res.json(departments);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const newFaculty = new Faculty({
    facultyTitle: req.body.facultyTitle,
    facultyImage: req.body.facultyImage,
    facultyDescription: req.body.facultyDescription,
    departments: req.body.departments,
  });

  newFaculty
    .save()
    .then(() => res.json("Faculty Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
