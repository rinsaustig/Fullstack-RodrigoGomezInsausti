const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'El correo es requerido'],
        lowercase: true, 
        validate: [isEmail, 'Por favor ingrese un correo válido'] 
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es requerida'],
        minlength: [6, 'La contraseña debe tener un mínimo de 6 caracteres']
    }
});

userSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc);
    // next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;