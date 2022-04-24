const router = require('express').Router();
const Student = require('../models/student');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const verification = express.Router()

verification.use((req, res, next) => {
    let token = req.headers['authorization'];
    console.log(req.headers, token)
    if(!token) {
        req.status(401).send({ error: 'No tienes autorización' })
    }
    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }
    if(token) {
        jwt.verify(token, process.env.key, (error, decoded) => {
            if(error) {
                return res.json({
                    message: "No tienes autorización"
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
})


router.get('/', (req, res) => {
    Student.find().then(students => {
        res.status(200).json(students)
    }).catch(error => {
        req.status(500).json({ error: error.message })
    })
})

router.post('/register', verification, async (req, res) => {
    try {
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
    const hash = await bcryptjs.hashSync(password, 8)
    Student.findOne({ email: req.body.email }).then(async student => {
            let compare = await bcryptjs.compare(password, student.password)
            if (compare) {
                const payload = {
                    check: true
                }
                const token = jwt.sign(payload, process.env.KEY, {
                    expiresIn: '7d'
                })
                res.status(200).json(token);
            
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