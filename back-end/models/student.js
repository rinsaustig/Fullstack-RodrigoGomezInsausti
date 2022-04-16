const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student: {
        type: String,
        required: [true, 'Ingrese un nombre de estudiante'],
    },
    birthday: {
        type: Date,
        required: [true, 'Ingrese una fecha de nacimiento'],
    },
    father: {
        type: String,
        required: [true, 'Ingrese el nombre del padre'],
    },
    mother: {
        type: String,
        required: [true, 'Ingrese el nombre de la madre'],
    },
    degree: {
        type: Number,
        required: [true, 'Ingrese el grado que cursa'],
    },
    section: {
        type: String,
        required: [true, 'Ingrese la sección en la que cursa'],
    },
    inscription: {
        type: Date,
        required: [true, 'Ingrese la fecha de ingreso'],
    },
    email: {
        type: String,
        required: [false],
    },
    password: {
        type: String,
        required: [false],
    },
});

module.exports = mongoose.model('Student', StudentSchema);