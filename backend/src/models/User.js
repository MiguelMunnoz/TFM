const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: 'profilePic.png',
        required: true
    }
    
});

// Metodo que hashea implicitamente
userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(this.password, salt);

        this.password = hashedPass;
        next();
    } catch (error) {
        next(error);
    }
});

// Metodo para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);
module.exports = User; 