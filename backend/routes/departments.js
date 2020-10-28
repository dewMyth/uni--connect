const router = require("express").Router();

const Department = require("../models/Department");

// router.route("/").get((req, res) => {
//   Department.find()
//     .then((departments) => res.json(departments))
//     .catch((err) => res.status(400).json("Error:" + err));
// });

//Find All departments
router.route("/").get((req, res) => {
  Department.find()
    .populate("degrees", "_id degreeTitle degreeDescription")
    .select("")
    .then((degrees) => {
      res.json(degrees);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//Add a New Department
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

//Add a Department by Id
router.get("/:id", (req, res) => {
  Department.findById(req.params.id)
    .populate("degrees", "degreeTitle")
    .populate("faculty", "facultyTitle")
    .select("")
    .then((department) => res.json(department))
    .catch((err) => res.status(400).json("Department not found" + err));
});

//get User from a department
router.get("/students/:id", (req, res) => {
  User.find({ department: req.params.id }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(users);
  });
});

module.exports = router;
