const router = require('express').Router();

const Department = require('../models/Department');

router.route('/').get((req,res) => {
    Department.find()
        .then(departments=> res.json(departments))
        .catch(err => res.status(400).json('Error:' + err));
});


router.route('/add').post((req, res) => {
    const departmentTitle = req.body.departmentTitle;
    const departmentImage = req.body.departmentImage;
    const faculty = req.body.faculty;
    const departmentDescription = req.body.departmentDescription;

    const newDegree = new Department({
        departmentTitle,
        departmentImage,
        faculty,
        departmentDescription
    });

    newDepartment.save()
        .then(()=> res.json('Department Added'))
        .catch(err => res.status(400).json('Error : ' + err));
});


module.exports = router;