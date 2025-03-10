const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const register = async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,12);
    
    try {
        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({message: 'User registration failed.', error});
    }
};

const login = async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: 'invalid password'});
        }

        const token = jwt.sign({userId:  user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({message: 'Login failed.', error});
    }
};

export default {register, login};