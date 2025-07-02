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
        select: false, // Nao ira retornar a senha por padrao
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema);