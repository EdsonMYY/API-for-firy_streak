const user = require('../models/userModel');
const jwt = require('sonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const userExists = await user.findOne({ email });
        if (userExists) {
            return res.status(400).json({success: false, error: 'Usuário já existe.'});
        }
        const user = await User.create({ nome, email, password });
        res.status(201).json({
            success: true,
            data: { _id: user._id, nome: user.nome, email: user.email },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Forneça email e senha.' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
    }
    res.status(200).json({
      success: true,
      data: { _id: user._id, nome: user.nome, email: user.email },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro no servidor.' });
  }
};