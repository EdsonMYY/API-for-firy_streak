const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, required: [true, 'Nome de usuário é obrigatório']},
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatóriojj'],
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor, insira um e-mail válido'],
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [8, 'A senha deve ter pelo menos 8 caracteres'],
        select: false,
    }
}, {timestamps: true})

UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);