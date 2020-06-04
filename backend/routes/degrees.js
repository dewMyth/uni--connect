const router = require("express").Router();

const Degree = require("../models/Degree");

router.route("/").get((req, res) => {
  Degree.find()
    .populate("department", "departmentTitle")
    .populate("faculty", "facultyTitle")
    .select("")
    .then((degrees) => res.json(degrees))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const degreeTitle = req.body.degreeTitle;
  const degreeDescription = req.body.degreeDescription;
  const department = req.body.department;
  const faculty = req.body.faculty;

  const newDegree = new Degree({
    degreeTitle,
    degreeDescription,
    department,
    faculty,
  });

  newDegree
    .save()
    .then(() => res.json("Degree Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
