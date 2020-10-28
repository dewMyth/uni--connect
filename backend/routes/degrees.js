const router = require("express").Router();

const Degree = require("../models/Degree");
const User = require("../models/User");

router.route("/").get((req, res) => {
  Degree.find()
    .populate("department", "departmentTitle")
    .populate("faculty", "facultyTitle")
    .select("")
    .then((degrees) => res.json(degrees))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/find").get((req, res) => {
  Degree.find()
    .populate("department", "departmentTitle")
    .populate("faculty", "facultyTitle")
    .limit(4)
    .sort({ created: -1 })
    .select("")
    .then((degrees) => res.json(degrees))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
  Degree.findById(req.params.id)
    .populate("department", "departmentTitle")
    .populate("faculty", "facultyTitle")
    .select("")
    .then((degree) => res.json(degree))
    .catch((err) => res.status(400).json("Degree not found" + err));
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

router.get("/students/:id", (req, res) => {
  User.find({ degree: req.params.id }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(users);
  });
});

router.post("/search-degree", (req, res) => {
  let userPattern = new RegExp(req.body.query);
  Degree.find({ degreeTitle: { $regex: userPattern } })
    .limit(3)
    .then((degree) => {
      res.json({ degree });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
