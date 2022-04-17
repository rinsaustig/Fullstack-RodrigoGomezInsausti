const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Student = require('../models/student');
const bcryptjs = require('bcryptjs')

router.get('/', (req, res) => {
    Student.find().then(students => {
        res.status(200).json(students)
    }).catch(error => {
        req.status(500).json({ error: error.message })
    })
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 8)
        if (await studentExists(req.body.student)) {
            res.status(409).json({ error: 'Estudiante ya registrado' })
        } else {
            const newStudent = new Student({
                student: req.body.student,
                birthday: req.body.birthday,
                father: req.body.father,
                mother: req.body.mother,
                degree: req.body.degree,
                section: req.body.section,
                inscription: req.body.inscription,
                email: req.body.email,
                password: hashedPassword
            })
            newStudent.save().then(student => {
                res.status(200).json(student)
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    } 
}) 





router.post('/login', async (req, res) => {
    const password = req.body.password;
    const passHash = await bcryptjs.hash(password, 8)
    Student.findOne({ email: req.body.email }).then(student => {
            let compare = bcryptjs.compare(passHash, student.password)
            if (compare) {
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