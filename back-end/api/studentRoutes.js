const router = require('express').Router();
const Student = require('../models/student');

router.get('/', (req, res) => {
    Student.find().then(students => {
        res.status(200).json(students)
    }).catch(error => {
        req.status(500).json({ error: error.message })
    })
})

router.post('/register', async (req, res) => {
    if (await studentExists(req.body.student)) {
        res.status(409).json({ error: 'Estudiante ya registrado' })
    } else {
        const newStudent = new Student(req.body)
        newStudent.save().then(student => {
            res.status(200).json(student)
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
});

router.post('/login', (req, res) => {
    Student.findOne({ email: req.body.email, password: req.body.password }).then(student => {
            if(student) {
                res.status(200).json(student);
            } else {
                res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            }
    }).catch(err => {
        res.status(500).json({ error: err.message })
    });

});



const studentExists = async (student) => {
    const name = await Student.findOne({ student: student })

    if (name) {
        return true
    } else {
        return false
    }

}



module.exports = router;