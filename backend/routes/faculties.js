const router = require('express').Router();

const Faculty = require('../models/Faculty');

router.route('/').get((req,res) => {
    Faculty.find()
        .then(faculties => res.json(faculties))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
    const facultyTitle = req.body.facultyTitle;
    const facultyImage = req.body.facultyImage;
    const facultyDescription = req.body.facultyDescription;

    const newFaculty = new Faculty({
        facultyTitle,
        facultyImage,
        facultyDescription
    });

    newFaculty.save()
        .then(()=> res.json('Faculty Added'))
        .catch(err => res.status(400).json('Error : ' + err));
});


module.exports = router;